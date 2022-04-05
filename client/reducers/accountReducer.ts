import * as actionTypes from '../constants/actionTypes';

const initialState:account = {
  name: null,
  gender: null,
  main: null,
  mora: null,
  characters_owned: null,
  wishes: null
};

function accountReducer(state = initialState, action:actionObject) {
  switch(action.type) {

    case actionTypes.INITIALIZE:
      return {...state, ...action.payload};
    
    case actionTypes.LOG_OUT:
      return {...initialState};

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
}

interface actionObject {
  type: string,
  payload: any
};

export default accountReducer;