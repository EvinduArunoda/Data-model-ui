import {
    call, put, takeEvery // select, take were removed
} from 'redux-saga/effects';
import firebase from "firebase/app";
import {LOGIN_USER, loginUserError, loginUserSuccess} from "./actions";

async function loginAsync(email, password) {
    console.log(email,password)
    await firebase.auth().signInWithEmailAndPassword(email, password);
}

export function* loginAuth(action) {
    try {
        yield call(loginAsync, action.email, action.password);
        yield put(loginUserSuccess());
    } catch (e) {
        yield put(loginUserError(e));
    }
}

// Individual exports for testing
function* getLoginSagas() {
    yield takeEvery(LOGIN_USER, loginAuth);
}

export const loginSagas = [getLoginSagas];

