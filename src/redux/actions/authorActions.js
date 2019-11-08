import * as actionTypes from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import beginServerCall, { serverCallError } from "./serverCallStatusActions";

export function loadAuthorsSuccess(authors) {
    return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
    return function(dispatch) {
        dispatch(beginServerCall());
        return authorApi.getAuthors().then((authors) => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch((error) => {
            dispatch(serverCallError(error));
            throw error;
        });
    }
}