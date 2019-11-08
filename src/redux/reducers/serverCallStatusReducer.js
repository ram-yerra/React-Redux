import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function severCallStatusReducer(state = initialState.serverCallsInProgress, action) {
    if(action.type === types.BEGIN_SERVER_CALL) {
        return state + 1;
    }
    if(action.type.includes('_SUCCESS') || action.type === types.SERVER_CALL_ERROR) {
        return state - 1;
    }
    return state;
}

