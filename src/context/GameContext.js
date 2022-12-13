import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as gameService from '../services/gameService'

export const GameContext = createContext();

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GAMES':
            return action.payload.map(x => ({...x, comments: []}));
        case 'ADD_GAME':
            return [...state, action.payload];
        case 'EDIT_GAME':
            return state.map(x => x._id === action.gameId ? action.payload : x);
        case 'ADD_COMMENT':
            return state.map(x => x._id === action.gameId ? {...x, comments: [...x.comments, action.payload ]} : x);    
        case 'REMOVE_GAME':
            return state.filter(x => x._id !== action.gameId);
        default:
            return state;
    }
};

export const GameProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [games, dispatch] = useReducer(gameReducer, []);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                const action = {
                    type: "ADD_GAMES",
                    payload: result
                };

                dispatch(action);
            });
    }, []);

    const addComment = (gameId, comment) => {
        dispatch({
            type: "ADD_COMMENT",
            payload: comment,
            gameId
        })
        /*  dispatch( state => {
              const game = state.find(x => x._id == gameId);
  
              const comments = game.comments || [];
              comments.push(comment);
              
   //когато променяме state правим нова референция и връщаме чисто нов state с актуалните коментари
              return [
                  ...state.filter(x => x._id !== gameId),
                  { ...game, comments }
              ];
          });*/
    };

    const gameAdd = (gameData) => {
        dispatch({
            type: 'ADD_GAME',
            payload: gameData,
        });
        navigate('/catalog');
    }

    const editGame = (gameId, gameData) => {
        //setGames(state => state.map(x => x._id === gameId ? gameData : x));
        dispatch({
            type: 'EDIT_GAME',
            payload: gameData,
            gameId
        });
    }

    const removeGame = (gameId) => {
        dispatch({
            type: 'REMOVE_GAME',
            gameId
        })
    }

    return (
        <GameContext.Provider value={{ games, gameAdd, editGame, addComment, removeGame }}>
            {children}
        </GameContext.Provider>
    );
}