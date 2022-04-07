import { Socket } from 'socket.io-client';
import * as actionTypes from '../constants/actionTypes';

const initialState:account = {
  name: null,
  gender: null,
  main: null,
  mora: null,
  characters_owned: null,
  wishes: null,
  socket: null,
  initialized: false
};

function accountReducer(state = initialState, action:actionObject) {
  switch(action.type) {

    case actionTypes.INITIALIZE:
      return {...state, ...action.payload};
    
    case actionTypes.LOG_OUT:
      return {...initialState, authenticated: false};

    default:
      return state;
  }
};

interface account {
  name: string | null,
  gender: string | null,
  main: string | null,
  mora: string | null,
  characters_owned: {name:string}[] | null,
  wishes: {amount: number, progress: number} | null,
  socket: Socket,
  initialized: boolean
}

interface actionObject {
  type: string,
  payload: any
};

export default accountReducer;