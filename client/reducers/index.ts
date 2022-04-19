import { combineReducers } from "redux";
import accountReducer from './accountReducer';
import pageReducer from './pageReducer';
import charactersReducer from './charactersReducer';
import talkReducer from './talkReducer';

const reducers = combineReducers({
  account: accountReducer,
  page: pageReducer,
  characters: charactersReducer,
  talk: talkReducer
});

export default reducers;