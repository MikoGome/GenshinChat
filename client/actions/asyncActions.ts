import { initialize, logOut, updateCharPool, updateWish } from './actions';
import io from 'socket.io-client';
import axios from 'axios';
import socketAttachListeners from '../socket/socketListeners';

let wishInterval = null;

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
    const socket = io();
    socketAttachListeners(socket, dispatch);
    const {name, gender, authenticated} = account;
    const {main} = possession;
    socket.emit('signIn', {name, gender, main});
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

export const wish = (account) => async (dispatch, getState) => {
  try {
    const {data} = await axios.post('/api/wish', account);
    dispatch(updateCharPool(data));

  } catch(e) {
    console.log(e)
  }
}

export const wishing = (account) => async(dispatch, getState) => {
  try {
    const {data: newWishes} = await axios.post('/api/account/wishing', account);
    dispatch(updateWish(newWishes))
  } catch(e) {
    console.log(e);
  }
}