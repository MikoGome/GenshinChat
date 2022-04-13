import { Socket } from 'socket.io-client';
import * as actionTypes from '../constants/actionTypes';

const initialState:account = {
  name: '',
  gender: '',
  main: '',
  mora: 0,
  characters_owned: [],
  wishes: {amount: 0, progress: 0},
  socket: null,
  initialized: false
};

function accountReducer(state = initialState, action:actionObject) {

  switch(action.type) {

    case actionTypes.INITIALIZE:
      return {...state, ...action.payload};

    case actionTypes.UPDATE_CHAR_POOL:
      return {...state, ...action.payload};
    
    case actionTypes.UPDATE_WISH:
      return {...state, wishes: action.payload};

    case actionTypes.UPDATE_MAIN:
      if(action.payload.main === 'aether' || action.payload.main === 'lumine') {
        action.payload.main = 'traveler-anemo';
      }
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
  mora: 0 | null,
  characters_owned: string[],
  wishes: {amount: number, progress: number},
  socket: Socket,
  initialized: boolean
}

interface actionObject {
  type: string,
  payload: any
};

export default accountReducer;