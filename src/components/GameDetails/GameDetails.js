import { useState } from "react";
import { useParams } from "react-router-dom";

const GameDetails = ({
    games,
    addComment,
}) => {
    const { gameId } = useParams();
    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });

    const [error, setError] = useState({
        username: '',
        comment: '',
    })

    const game = games.find(x => x._id == gameId);

    const addCommentHandler = (e) => {
        e.preventDefault();

        addComment(gameId, `${comment.username}: ${comment.comment}`);
    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const validateUsername = (e) => {
        const username = e.target.value;
        let errorMessage = "";

        if (username.length < 4) {
           errorMessage = "Username must be longer than 4 characters";
        } else if (username.length > 10) {
            errorMessage = "Username must be shorter than 10 characters";
        }

        setError(state => ({
            ...state,
            username: errorMessage,
        }));
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>

                        {game.comments?.map(x =>
                            <li className="comment">
                                <p>{x}</p>
                            </li>
                        )}
                    </ul>

                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <a href="#" className="button">
                        Edit
                    </a>
                    <a href="#" className="button">
                        Delete
                    </a>
                </div>
            </div>

            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />
                    {error.username &&
                        <div style={{ color: "red" }}>{error.username}</div>
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
            </article>
        </section>
    );
};

export default GameDetails;