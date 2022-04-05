import {SEND_MESSAGE} from '../constants/actionTypes';
import {deepCopy} from '../utils/helperFunctions';

const initialState:pageStateShape = {
  chatHistory: []
};

function pageReducer(state = initialState, action) {
  switch(action.type) {

    case SEND_MESSAGE:
      const newState = deepCopy(state);
      newState.chatHistory.push(action.payload);
      return newState;

    default:
      return state;
  }
}

interface chatHistoryShape {
  sender: string,
  message: string
}

interface pageStateShape {
  chatHistory:chatHistoryShape[],

}

export default pageReducer;