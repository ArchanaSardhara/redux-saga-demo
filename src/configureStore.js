import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './redux/reducer';
import sagaPlayerWatcher from "./redux/player/saga";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagaPlayerWatcher);

export default store;