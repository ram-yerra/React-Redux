import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorsReducer';
import serverCallsInProgress from './serverCallStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    serverCallsInProgress
});

export default rootReducer;