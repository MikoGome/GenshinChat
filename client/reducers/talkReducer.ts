import * as actionTypes from '../constants/actionTypes';
import { deepCopy } from '../utils/helperFunctions';

const initialState: talkStateShape = {
  roomId: '',
  participants: [],
  chatHistory: [],
  focus: null,
  talkRequest: null
}

function talkReducer(state = initialState, action: actionObject) {
  switch(action.type) {

    case actionTypes.LEAVE_TALK: {
      const newState = deepCopy(initialState);
      return newState;
    }
    
    case actionTypes.RECEIVED_TALK_REQUEST: {
      const newState = deepCopy(state);
      newState.talkRequest = action.payload;
      return newState;
    }
    
    case actionTypes.JOIN_ROOM: {
      const newState = deepCopy(state);
      const {roomId, participants} = action.payload;
      newState.roomId = roomId;
      newState.participants = participants;
      return newState;
    }

    case actionTypes.SEND_TALK: {
      const newState = deepCopy(state);
      newState.chatHistory.push(action.payload);
      return newState;
    }

    case actionTypes.UPDATE_ROOM: {
      const newState = deepCopy(state);
      return {...newState, ...action.payload};
    }

    default:
      return state;
  }
}

export interface talkStateShape {
  roomId: string,
  participants: participantShape[],
  chatHistory: chatHistoryShape[],
  focus: participantShape,
  talkRequest: (any | null)
}

interface actionObject {
  type: string,
  payload: any
};

interface chatHistoryShape {
  name: string,
  main: string,
  gender: string,
  message: string
}

interface participantShape {
  name: string,
  gender: string,
  main: string
}

export default talkReducer;