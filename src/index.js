import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Routing from './route';
import reducer from './reducer';
import mySaga from './saga';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/main.css";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const combineReducer = combineReducers({
  players: reducer,
})

let store = createStore(
  combineReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(mySaga)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();