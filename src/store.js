import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history'
import {connectRouter} from 'connected-react-router'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import loginReducer from "./redux/login/reducer";
import {loginSagas} from "./redux/login/saga";
import {all, fork} from "redux-saga/effects";

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  router: connectRouter(history),
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  loginReducer: loginReducer,
});

function* rootSaga() {
  yield all(loginSagas.map(s => fork(s)));
}

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
