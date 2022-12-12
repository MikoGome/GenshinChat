import * as actions from './actions';
import io from 'socket.io-client';
import axios from 'axios';
import socketAttachListeners from '../socket/socketListeners';

let wishInterval = null;

export let socket = null;
let name = null;
let gender = null;
let main = null;
let visibility = null;

export const logIn = (url, account) => async (dispatch) => {
  try{
    const {data} = await axios.post(url, account);
    dispatch(actions.initialize({authenticated: data}));
  } catch(e) {
    console.log(e)
  }
}

export const authenticate = () => async (dispatch, getState) => {
  try {
    const {data} = await axios.get('/api/authenticate');
    if(data.authenticated) {
      if(getState().account.initialized) {
        dispatch(getFriends(getState().account.id));
        return;
      }
      else {
        if(data.authenticated === 'exists') {
          dispatch(actions.initialize({authenticated: 'exists'}));
        } else {
          dispatch(getAccount(data));
        }
      }
    } else {
      dispatch(actions.initialize({authenticated: data.authenticated}));
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
    dispatch(actions.updateSpotlight(main));
    dispatch(getFriends(account.id));
    wishInterval = setInterval(() => {
      dispatch(wishing(account));
    }, 60000);
    visibility = document.onvisibilitychange = () => {
      if(document.visibilityState === 'hidden') {
        socket.emit('inactive');
      } else if(document.visibilityState === 'visible') {
        socket.emit('active');
      }
    };
    dispatch(
      actions.initialize({
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
    document.removeEventListener('visibilitychange', visibility);
    visibility = null;
    getState().account.socket.disconnect();
    dispatch(actions.logOut());
  } catch(e) {
    console.log(e);
  }
}

export const wish = (account) => async (dispatch) => {
  try {
    const {data} = await axios.patch('/api/wish', account);
    const {pool, prize} = data;
    dispatch(actions.updateCharPool(pool));
    dispatch(actions.prize(prize));
    dispatch(actions.updateSpotlight(prize));
  } catch(e) {
    console.log(e)
  }
}

export const wishing = (account) => async(dispatch) => {
  try {
    const {data: newWishes} = await axios.patch('/api/account/wishing', account);
    dispatch(actions.updateWish(newWishes));
  } catch(e) {
    console.log(e);
  }
}

export const getInfo = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/character/info');
    dispatch(actions.updateInfo(data));
  } catch(e) {
    console.log(e);
  }
}

export const changeMain = (payload) => async (dispatch) => {
  try {
    const {main:newMain, possession} = payload;
    const {data} = await axios.patch('/api/account/main', {main: newMain, possession});
    dispatch(actions.updateMain(data));
    main = data;
    socket.emit('signIn', {name, gender, main});
  } catch(e) {
    console.log(e);
  }
}

export const getFriends = (payload) => async(dispatch) => {
  try {
    const {data} = await axios.get('/api/friends/' + payload);
    const friends: {[name: string]: object} = {}
    data.forEach(element => {
      friends[element.username] = {
        id: element.id,
        gender: element.gender,
        possessionKey: element.possession,
        online: element.online
      };
    })
    dispatch(getFriendsPossession(friends));
  } catch(e) {
    console.log(e);
  }
}

export const getFriendsPossession = (payload) => async(dispatch) => {
  try {
    for(const key in payload) {
      const {data} = await axios.get('/api/possession/' + payload[key].possessionKey);
      payload[key].possession = data;
    }
    dispatch(actions.updateFriends(payload));
  } catch(e) {
    console.log(e);
  }
}

export const removeFriend = (payload:{removeId:string, accountId:string}) => async(dispatch) => {
  const {removeId, accountId} = payload;
  try {
    await axios.delete(`/api/friends/remove/?remove=${removeId}&account=${accountId}`);
    dispatch(getFriends(accountId));
  } catch(e) {
    console.log(e);
  }
}