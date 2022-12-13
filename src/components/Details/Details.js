import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GameContext } from "../../context/GameContext";
import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

export const Details = () => {
        const navigate = useNavigate();
        const { addComment, removeGame } = useContext(GameContext);
        const { gameId } = useParams();
        const [ currentGame, setCurrentGame] = useState({});


        useEffect(() =>{
            gameService.getOneGame(gameId)
            .then(result => {
                setCurrentGame(result);
            })
        }, [])

        const addCommentHandler = (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const comment = formData.get('comment');

            commentService.create(gameId, comment)
            .then(result => {
                addComment(gameId, comment);
            }) 
        }

        const gameDeleteHandler = () => {
           const confirmation = window.confirm('Are you sure you want to delete this game?');
            if(confirmation){
                gameService.deleteGame(gameId)
                .then(() =>{
                    removeGame(gameId);
                    navigate('/catalog');
                });   
            }
        }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={currentGame.imageUrl} />
                    <h1>{currentGame.title}</h1>
                    <span className="levels">MaxLevel: {currentGame.maxLevel}</span>
                    <p className="type">{currentGame.category}</p>
                </div>
                <p className="text">
                    {currentGame.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {currentGame.comments?.map(x => 
                        <li className="comment">
                            <p>Content: {x}</p>
                        </li>
                        )}
                    </ul>
                    {/* Display paragraph: If there are no games in the database */}
                    {!currentGame.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                    
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">
                        Edit
                    </Link>
                    <button onClick={gameDeleteHandler} className="button"> 
                        Delete
                    </button>
                </div>
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
          
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                />
                </form>
            </article>
        </section>
    );
}