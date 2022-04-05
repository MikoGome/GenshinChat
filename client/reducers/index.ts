import { combineReducers } from "redux";
import accountReducer from './accountReducer';
import pageReducer from './pageReducer';

const reducers = combineReducers({
  account: accountReducer,
  page: pageReducer
});

export default reducers;