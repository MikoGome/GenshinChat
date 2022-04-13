import * as actionTypes from '../constants/actionTypes';
import {deepCopy} from '../utils/helperFunctions';

const initialState:pageStateShape = {
  chatHistory: [],
  users: [],
  friendRequest: null,
};

function pageReducer(state = initialState, action) {
  switch(action.type) {

    case actionTypes.SEND_MESSAGE: {
      const newState = deepCopy(state);
      newState.chatHistory.push(action.payload);
      return newState;
    }

    case actionTypes.UPDATE_ONLINE_USERS: {
      const newState = deepCopy(state);
      newState.users = action.payload;
      return newState;
    }
    
    case actionTypes.RECEIVED_FRIEND_REQUEST: {
      const newState = deepCopy(state);
      newState.friendRequest = action.payload;
      return newState;
    }

    case actionTypes.LOG_OUT: {
      const newState = deepCopy(initialState);
      return newState;
    }


    default:
      return state;
  }
}

interface pageStateShape {
  chatHistory:chatHistoryShape[],
  users: [],
  friendRequest: (any | null)

}

interface chatHistoryShape {
  name: string,
  main: string,
  gender: string,
  message: string
}

interface userShape {
  name: string,
  gender: 'male' | 'female',
  main: string
}

export default pageReducer;