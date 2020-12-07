import { call, put, takeLatest, all } from 'redux-saga/effects';
import { updatePlayers } from './redux/action';
import request from './request';
import { ADD_PLAYER, PLAYERS_LIST } from './redux/type';

export function* loadPlayerList(data) {
  const requestURL = `http://localhost:5000/players`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      // 'Content-Type': 'application/json; charset=utf-8',
    },
    // body: JSON.stringify({ tagIds: action.tagIds }),
  };
  const response = yield call(request, requestURL, options);
  yield put(updatePlayers(response));
  data.setter(response);
}

export function* addPlayerToDb(req) {
  const requestURL = `http://localhost:5000/add`;
  const options = {
    method: 'POST',
    body: req.payload,
  };
  yield call(request, requestURL, options);
}

export default function* playerWatch() {
  // Watches for PLAYERS_LIST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(PLAYERS_LIST, loadPlayerList),
    takeLatest(ADD_PLAYER, addPlayerToDb),
  ]);
}