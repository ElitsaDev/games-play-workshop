import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GameContext } from "../../context/GameContext";
import * as gameService from '../../services/gameService';

export const Details = () => {
        const { addComment } = useContext(GameContext);
        const { gameId } = useParams();
        const [ currentGame, setCurrentGame] = useState({});
        const [ comment, setComment ] = useState({
            username: '',
            comment: ''
        });

        useEffect(() =>{
            gameService.getOneGame(gameId)
            .then(result => {
                setCurrentGame(result);
            })
        })

        const [ error, setError] = useState({
            username: '',
            comment: ''
        });

        const addCommentHandler = (e) => {
            e.preventDefault();
            addComment(gameId, `${comment.username}: ${comment.comment}`)
        }

        const onChange = (e) => {
            
            setComment(state => ({
                ...state,
                [e.target.name]: e.target.value
            }))
        }

        const validateUserName = (e) => {
            const value = e.target.value;     
            
            if(value.length < 3){
            
                setError(state => ({
                    ...state,
                    username: `Username must be more than 3 symbols long`
            }));
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
                    <a href="#" className="button"> 
                        Delete
                    </a>
                </div>
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
          
           {/* <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        name="username"
                        type="username"
                        placeholder="Username......"
                        onChange={onChange}
                        onBlur={validateUserName}
                        value={comment.username}
                    />
                    {error.username &&
                        <div style={{color: "red"}}>{error.username}</div>
                    }
                    
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                />
                </form>
            </article>*/}
        </section>
    );
}