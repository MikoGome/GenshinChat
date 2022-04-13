import * as actionTypes from '../constants/actionTypes';

const initialState: initialStateShape = {
  info: {},
  spotlight: ''
}

function characters(state = initialState, action) {
  switch(action.type) {

    case actionTypes.GET_INFO:
      state.info = action.payload;
      return {...state, info: action.payload};
    
    case actionTypes.UPDATE_SPOTLIGHT:
      return {...state, spotlight: action.payload};

    default: 
      return state;
  }
}

interface initialStateShape {
  info: object,
  spotlight: string
}

export default characters;