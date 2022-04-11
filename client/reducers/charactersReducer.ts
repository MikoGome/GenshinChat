import * as actionTypes from '../constants/actionTypes';

function characters(state = null, action) {
  switch(action.type) {

    case actionTypes.GET_INFO:
      return action.payload;
    
    default: 
      return state;
  }
}

export default characters;