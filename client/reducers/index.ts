import { combineReducers } from "redux";
import accountReducer from './accountReducer';
import pageReducer from './pageReducer';
import charactersReducer from './charactersReducer'

const reducers = combineReducers({
  account: accountReducer,
  page: pageReducer,
  characters: charactersReducer
});

export default reducers;