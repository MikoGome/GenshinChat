import { initialize, logOut, updateCharPool, updateWish, updateInfo, updateMain, updateSpotlight } from './actions';
import io from 'socket.io-client';
import axios from 'axios';
import socketAttachListeners from '../socket/socketListeners';

let wishInterval = null;

let socket = null;
let name = null;
let gender = null;
let main = null;

export const logIn = (url, account) => async (dispatch) => {
  try{
    const {data} = await axios.post(url, account);
    if(data) dispatch(initialize({authenticated: data}));
  } catch(e) {
    console.log(e)
  }
}

export const authenticate = () => async (dispatch, getState) => {
  try {
    const {data} = await axios.get('/api/authenticate');
    if(data.authenticated) {
      if(getState().account.initialized) return
      else dispatch(getAccount(data));
    } else {
      dispatch(initialize({authenticated: data.authenticated}));
    }
  } catch(e) {
    console.log(e)
  }
}

export const getAccount = ({account}) => async (dispatch) => {
  try {
    const { data: possession } = await axios.get('/api/account/initialize');
    socket = io();
    socketAttachListeners(socket, dispatch);
    name = account.name;
    gender = account.gender;
    main = possession.main;
    socket.emit('signIn', {name, gender, main});
    dispatch(getInfo());
    dispatch(updateSpotlight(main));
    wishInterval = setInterval(() => {
      dispatch(wishing(account));
    }, 60000);
    dispatch(
      initialize({
        ...account,
        ...possession, 
        socket,
        initialized: true
      })
    );
  } catch(e) {
    console.log(e)
  }
}

export const clearSession = () => async (dispatch, getState) => {
  try {
    await axios.get('/api/logout');
    clearInterval(wishInterval);
    wishInterval = null;
    getState().account.socket.disconnect();
    dispatch(logOut());
  } catch(e) {
    console.log(e)
  }
}

export const wish = (account) => async (dispatch) => {
  try {
    const {data} = await axios.patch('/api/wish', account);
    dispatch(updateCharPool(data));

  } catch(e) {
    console.log(e)
  }
}

export const wishing = (account) => async(dispatch) => {
  try {
    const {data: newWishes} = await axios.patch('/api/account/wishing', account);
    dispatch(updateWish(newWishes))
  } catch(e) {
    console.log(e);
  }
}

export const getInfo = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/character/info');
    dispatch(updateInfo(data));
  } catch(e) {
    console.log(e);
  }
}

export const changeMain = (payload) => async (dispatch) => {
  try {
    const {main:newMain, possession} = payload;
    const {data} = await axios.patch('/api/account/main', {main: newMain, possession});
    dispatch(updateMain(data));
    main = data;
    socket.emit('signIn', {name, gender, main})
  } catch(e) {
    console.log(e);
  }
}