import * as gameService from '../../services/gameService';
import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';

export const CreateGame = () => {
    const { gameAdd} = useContext(GameContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const gameData = Object.fromEntries(new FormData(e.currentTarget));
        gameService.createGame(gameData)
        .then(result => {
            console.log(result);
            gameAdd(result);
            navigate(`/catalog`);
        })
        .catch(() => {
            navigate('/');
        }); 
    }

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                    />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        placeholder={1}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                    />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={""} />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Create Game"
                    />
                </div>
            </form>
        </section>
    );
}