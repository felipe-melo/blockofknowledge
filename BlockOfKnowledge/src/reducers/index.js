import { combineReducers } from 'redux';
import search from './searchReducer';
import blocksReducer from './blocksReducer';

export default combineReducers({
    search,
    blocksReducer,
});
