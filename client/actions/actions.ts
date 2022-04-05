import * as actionTypes from '../constants/actionTypes';

//account
export const initialize = (payload) => ({
  type: actionTypes.INITIALIZE,
  payload: payload
})

export const logOut = () => ({
  type: actionTypes.LOG_OUT
})



//page

export const sendMessage = (payload) => ({
  type: actionTypes.SEND_MESSAGE,
  payload: payload
})