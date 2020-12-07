import { combineReducers } from 'redux';

import players from "./player/reducer";

const combineReducer = combineReducers({
  players: players,
})

export default combineReducer;