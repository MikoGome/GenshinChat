import { initialize, logOut } from './actions';
import io from 'socket.io-client';
import axios from 'axios';
import socketAttachListeners from '../socket/socketListeners';

export const logIn = (url, account) => async (dispatch) => {
  try{
    const {data} = await axios.post(url, account);
    if(data) dispatch(initialize({authenticated: data}));
  } catch(e) {
    throw e;
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
    throw e;
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
    dispatch(
      initialize({
        ...account,
        ...possession, 
        socket,
        initialized: true
      })
    );
  } catch(e) {
    throw e;
  }
}

export const clearSession = () => async (dispatch, getState) => {
  try {
    await axios.get('/api/logout');
    getState().account.socket.disconnect();
    dispatch(logOut());
  } catch(e) {
    throw e;
  }
}