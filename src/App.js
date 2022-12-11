import {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as gameService from './services/gameService';
import  uniqid from 'uniqid';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { CreateGame } from './components/CreateGame/CreateGame';
import { EditGame } from './components/EditGame/EditGame';
import { Catalog } from './components/Catalog/Catalog';
import { Details } from './components/Details/Details';
import './App.css';

function App() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const addComment = ( gameId,comment) => {
        setGames( state => {
            const game = state.find(x => x._id == gameId);

            const comments = game.comments || [];
            comments.push(comment);
            
 //когато променяме state правим нова референция и връщаме чисто нов state с актуалните коментари
            return [
                ...state.filter(x => x._id !== gameId),
                {...game, comments}
            ]
        })
    };

    const addGamesHandler = (gameData) =>{
        setGames(state => [
           ...state,
            
            {
                ...gameData,
                _id: uniqid()
            } 
        ]);

        navigate('/catalog');
    }

    useEffect(() => {
        gameService.getAll()
        .then(result => {
            setGames(result);
        })
    },[]);

    return (
        <div id="box">
            < Header />
            {/* Main Content */}
            <main id="main-content">
                <Routes>
                    <Route path="/" element={< Home games={games}/>}/>
                    <Route path="/login" element={< Login />}/>
                    <Route path="/register" element={< Register />}/>
                    <Route path="/create" element={< CreateGame addGamesHandler={addGamesHandler}/>}/>
                    <Route path="/create" element={< EditGame />}/>
                    <Route path="/catalog" element={< Catalog games={games}/>}/>
                    <Route path="/catalog/:gameId" element={< Details games={games} addComment={addComment} />}/>
                </Routes>
            </main>
            
            
            {/* Login Page ( Only for Guest users ) */}
            
            {/* Register Page ( Only for Guest users ) */}
            
            {/* Create Page ( Only for logged-in users ) */}
            
            {/* Edit Page ( Only for the creator )*/}
            
            {/*Details Page*/}
            
            {/* Catalogue */}
            
        </div>
    );

}

export default App;
