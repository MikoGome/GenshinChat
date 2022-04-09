import * as actionTypes from '../constants/actionTypes';

//account
export const initialize = (payload) => ({
  type: actionTypes.INITIALIZE,
  payload: payload
});

export const logOut = () => ({
  type: actionTypes.LOG_OUT
});

export const updateCharPool = (payload) => ({
  type: actionTypes.UPDATE_CHAR_POOL,
  payload: payload
});

export const updateWish = (payload) => ({
  type: actionTypes.UPDATE_WISH,
  payload: payload
});



//page

export const sendMessage = (payload) => ({
  type: actionTypes.SEND_MESSAGE,
  payload: payload
});

export const updateOnlineUsers = (payload) => ({
  type: actionTypes.UPDATE_ONLINE_USERS,
  payload: payload
});