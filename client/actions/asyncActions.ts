import * as actionTypes from '../constants/actionTypes';
import { initialize, logOut } from './actions';
import io from 'socket.io-client';
import { getJSDocTemplateTag } from 'typescript';

export const authenticate = () => (dispatch, getState) => {

  fetch('/api/authenticate')
    .then(res => res.json())
    .then(data => {
      if(data.authenticated) {
        if(getState().account.authenticated) return
        else dispatch(getAccount(data));
      } else {
        dispatch(initialize({authenticated: data.authenticated}))
      }
    })
}

export const getAccount = (data) => (dispatch) => {
  fetch('/api/account/initialize')
    .then(res => res.json())
    .then(possession => {
      const socket = io();
      socket.emit('signIn', data.account.name);
      dispatch(
        initialize({
          ...data.account,
          ...possession, 
          socket: socket,
          authenticated: data.authenticated
        })
      )
    })
}

export const clearSession = () => (dispatch, getState) => {
  fetch('/api/logout')
  .then(() => {
    getState().account.socket.disconnect();
    dispatch(logOut());
  });
}