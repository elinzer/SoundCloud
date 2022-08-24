import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as commentActions from '../../store/comments';
import { useEffect, useState } from 'react';

const SongPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [comment, setComment] = useState('');
    const song = useSelector(state => state.songs.find(song => song.id == id));
    const commentState = useSelector(state => state.comments);
    const commentsArr = Object.values(commentState);

    const sessionUser = useSelector(state => state.session.user);

    const data = {
        id
    };

    useEffect(() => {
        dispatch(commentActions.getComments(data))
    }, [dispatch]);


    if (!song) {
        return `Whoops something went wrong!`
    }

    const handleClick = (e) => {
        e.preventDefault();

        if (!comment) {
            alert(`comment can't be blank!`)
        } else if (comment.length < 3) {
            alert(`comment must be at least 3 characters!`)
        } else {
            const commentData = {
                id: song.id,
                body: comment
            }

            dispatch(commentActions.postComment(commentData))

            setComment('');
        }

    }

    const sendDelete = (e, id) => {
        e.preventDefault();

        const commentId = {
            id
        }

        dispatch(commentActions.deleteComment(commentId))

    }

    return (
        <div>
            <ul>
                <li>{song.title}</li>
                <li>{song.description}</li>
                <li>{song.imageUrl}</li>
                <li>Comments:
                    <ul>
                        {commentsArr.map(comment =>
                            (<li key={comment.id}>{comment.body} {comment.userId === sessionUser.id ? (<button onClick={(e) => sendDelete(e, comment.id)}>Delete</button>) : null}</li>))}
                    </ul>
                </li>
                <div>Leave a comment:
                    <br />
                    <textarea
                        placeholder='I love this song...'
                        wrap='soft'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <br />
                    <button onClick={handleClick}>Post comment</button>
                </div>
            </ul>
        </div>
    )
}

export default SongPage;
