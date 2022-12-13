import * as request from "./requester";

const baseUrl = `http://localhost:3030/data/games`;

export const getAll = () =>  request.get(baseUrl);

export const getOneGame = (gameId) => request.get(`${baseUrl}/${gameId}`)

export const createGame = (gameData) => request.post(baseUrl, gameData);

export const edit = (gameId, gameData) => request.put(`${baseUrl}/${gameId}`, gameData);
   