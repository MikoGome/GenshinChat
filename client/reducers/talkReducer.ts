import * as actionTypes from '../constants/actionTypes';
import { deepCopy } from '../utils/helperFunctions';

const initialState: talkStateShape = {
  roomId: '',
  participants: {},
  chatHistory: [],
  focus: null,
  typer: {},
  talkRequest: null
}

function talkReducer(state = initialState, action: actionObject) {
  const newState = deepCopy(state);
  switch(action.type) {

    case actionTypes.LEAVE_TALK: {
      const newState = deepCopy(initialState);
      return newState;
    }
    
    case actionTypes.RECEIVED_TALK_REQUEST: {
      newState.talkRequest = action.payload;
      return newState;
    }
    
    case actionTypes.JOIN_ROOM: {
      const {roomId, participants} = action.payload;
      newState.roomId = roomId;
      newState.participants = participants;
      console.log('JOINROOM', newState);
      return newState;
    }

    case actionTypes.SEND_TALK: {
      newState.chatHistory.push(action.payload);
      return newState;
    }

    case actionTypes.UPDATE_ROOM: {
      return {...newState, ...action.payload};
    }

    case actionTypes.TYPING: {
      newState.typer[action.payload] = true;
      return newState;
    }

    case actionTypes.DONE_TYPING: {
      delete newState.typer[action.payload];
      return newState;
    }

    default:
      return state;
  }
}

export interface talkStateShape {
  roomId: string,
  participants: participantShape,
  chatHistory: chatHistoryShape[],
  focus: focusShape
  typer: typerShape,
  talkRequest: (any | null),
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
  [name: string]: {gender: string, main: string}
}

interface focusShape {
  name: string, 
  gender: string,
  main: string
}

interface typerShape {
  name: boolean
}

export default talkReducer;