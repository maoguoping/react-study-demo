import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';

const rootReducer = combineReducers({
    app,
    auth
})
export default rootReducer;