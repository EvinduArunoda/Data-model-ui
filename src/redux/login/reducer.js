import produce from "immer";

import { LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from "./actions";

const INIT_STATE = {
    loggedIn: false,
    loading: false,
    error: null
};

export default function loginReducer(state = INIT_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case LOGIN_USER:
                draft.loading = true;
                break;
            case LOGIN_USER_ERROR:
                draft.error = action.payload;
                draft.loading = false;
                break;
            case LOGIN_USER_SUCCESS:
                draft.loggedIn = true;
                draft.loading = false;
                draft.error = null;
                break;
            default:
              break;
        }
    });
}
