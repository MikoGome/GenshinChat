import { initialize, logOut } from './actions';
import io from 'socket.io-client';
import axios from 'axios';
import socketAttachListeners from '../socket/socketListeners';

export const logIn = (url, account) => async (dispatch) => {
  const {data} = await axios.post(url, account);
  if(data) dispatch(initialize({authenticated: data}));
}

export const authenticate = () => async (dispatch, getState) => {
  const {data} = await axios.get('/api/authenticate');
  if(data.authenticated) {
    if(getState().account.initialized) return
    else dispatch(getAccount(data));
  } else {
    dispatch(initialize({authenticated: data.authenticated}))
  }
}

export const getAccount = ({account}) => async (dispatch) => {
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
      authenticated,
      initialized: true
    })
  );
}

export const clearSession = () => async (dispatch, getState) => {
  await axios.get('/api/logout');
  getState().account.socket.disconnect();
  dispatch(logOut());
}