import { Socket } from 'socket.io-client';
import * as actionTypes from '../constants/actionTypes';
import { deepCopy } from '../utils/helperFunctions';

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

    case actionTypes.INITIALIZE: {
      const newState = deepCopy(state);
      return {...newState, ...action.payload};
    }

    case actionTypes.UPDATE_CHAR_POOL: {
      const newState = deepCopy(state);
      return {...newState, ...action.payload};
    }
    
    case actionTypes.UPDATE_WISH: {
      const newState = deepCopy(state);
      return {...newState, ...action.payload};
    }

    case actionTypes.UPDATE_MAIN: {
      console.log('test', action.payload);
      const newState = deepCopy(state);
      console.log({...newState, ...action.payload});
      return {...newState, ...action.payload};
    }
      
    case actionTypes.LOG_OUT: {
      const newState = deepCopy(initialState);
      return {...newState, authenticated: false};
    }
    
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