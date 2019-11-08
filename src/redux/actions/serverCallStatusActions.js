import * as types from "./actionTypes";

export default function beginServerCall() {
    return { type:  types.BEGIN_SERVER_CALL };
}

export function serverCallError() {
    return { type: types.SERVER_CALL_ERROR };
}