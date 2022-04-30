import * as actionTypes from '../constants/actionTypes';
import { deepCopy } from '../utils/helperFunctions';

const initialState: initialStateShape = {
  info: {},
  spotlight: '',
  prize: ''
}

function characters(state = initialState, action) {
  const newState = deepCopy(state);
  switch(action.type) {

    case actionTypes.GET_INFO:
      newState.info = action.payload;
      return newState;
    
    case actionTypes.UPDATE_SPOTLIGHT:
      newState.spotlight = action.payload;
      return newState

    case actionTypes.PRIZE:
      newState.prize = action.payload;
      console.log('newState', newState);
      return newState;
      
    default: 
      return state;
  }
}

interface initialStateShape {
  info: object,
  spotlight: string,
  prize: string
}

export default characters;