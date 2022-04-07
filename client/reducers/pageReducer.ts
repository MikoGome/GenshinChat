import {SEND_MESSAGE, UPDATE_ONLINE_USERS} from '../constants/actionTypes';
import {deepCopy} from '../utils/helperFunctions';

const initialState:pageStateShape = {
  chatHistory: [],
  users: []
};

function pageReducer(state = initialState, action) {
  switch(action.type) {

    case SEND_MESSAGE: {
      const newState = deepCopy(state);
      newState.chatHistory.push(action.payload);
      return newState;
    }

    case UPDATE_ONLINE_USERS: {
      const newState = deepCopy(state);
      newState.users = action.payload;
      console.log(newState);
      return newState;
    }

    default:
      return state;
  }
}

interface pageStateShape {
  chatHistory:chatHistoryShape[],
  users: []

}

interface chatHistoryShape {
  sender: string,
  message: string
}

interface userShape {
  name: string,
  gender: 'male' | 'female',
  main: string
}

export default pageReducer;