import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import page from './page';

const rootReducer = combineReducers({
    app,
    auth,
    page
})
export default rootReducer;