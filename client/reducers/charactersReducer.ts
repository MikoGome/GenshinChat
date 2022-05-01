import * as actionTypes from '../constants/actionTypes';
import { deepCopy } from '../utils/helperFunctions';

const initialState: initialStateShape = {
  info: {},
  amount: 0,
  spotlight: '',
  prize: ''
}

function characters(state = initialState, action) {
  const newState = deepCopy(state);
  switch(action.type) {

    case actionTypes.GET_INFO:
      const {info, amount} = action.payload;
      newState.info = info;
      newState.amount = amount;
      return newState;
    
    case actionTypes.UPDATE_SPOTLIGHT:
      newState.spotlight = action.payload;
      return newState

    case actionTypes.PRIZE:
      newState.prize = action.payload;
      return newState;
      
    default: 
      return state;
  }
}

interface initialStateShape {
  info: object,
  amount: number,
  spotlight: string,
  prize: string
}

export default characters;