import { ADD_PLAYER, PLAYERS_LIST, UPDATE_PLAYERS_LIST } from "./type"

export const loadPlayers = (setter) => {
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