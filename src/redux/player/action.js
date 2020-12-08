import { ADD_PLAYER, DELETE_PLAYER, PLAYERS_LIST, UPDATE_PLAYER, UPDATE_PLAYERS_LIST } from "./type";

const setterFn = (data) => {
  return data;
}

export const loadPlayers = (setter = setterFn) => {
  return {
    type: PLAYERS_LIST,
    setter
  }
}

export const updatePlayers = (payload) => {
  return {
    type: UPDATE_PLAYERS_LIST,
    payload
  }
}

export const addPlayer = (payload) => {
  return {
    type: ADD_PLAYER,
    payload
  }
}

export const updatePlayer = (payload, id) => {
  return {
    type: UPDATE_PLAYER,
    payload,
    id
  }
}

export const deletePlayer = (id) => {
  return {
    type: DELETE_PLAYER,
    id
  }
}