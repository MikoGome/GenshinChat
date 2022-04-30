import * as actionTypes from '../constants/actionTypes';
import { deepCopy } from '../utils/helperFunctions';

const initialState: talkStateShape = {
  roomId: '',
  participants: {},
  inactive: {},
  chatHistory: [],
  focus: {
    name: '', 
    gender: '',
    main: ''
  },
  typer: {},
  talkRequest: null,
  messageProg: 1
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
      return newState;
    }

    case actionTypes.SEND_TALK: {
      const {name, main, gender, message} = action.payload;
      newState.chatHistory.push({name, main, gender, message});
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

    case actionTypes.UPDATE_INACTIVE: {
      newState.inactive = action.payload;
      return newState;
    }

    case actionTypes.UPDATE_FOCUS: {
      newState.focus = action.payload;
      return newState;
    }

    case actionTypes.INCREMENT_MSG_PROG: {
      newState.messageProg += 1;
      return newState;
    }

    default:
      return state;
  }
}

export interface talkStateShape {
  roomId: string,
  participants: participantShape,
  inactive: {[name:string]: true},
  chatHistory: chatHistoryShape[],
  focus: focusShape
  typer: typerShape,
  talkRequest: (any | null),
  messageProg: number
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
  [name: string]: boolean
}

export default talkReducer;