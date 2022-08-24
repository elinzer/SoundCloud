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
        } else if (comment.length < 10) {
            alert(`comment must be at least 10 characters!`)
        } else {
            const commentData = {
                id: song.id,
                body: comment
            }

            dispatch(commentActions.postComment(commentData))

            setComment('');
        }


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
                            (<li key={comment.id}>{comment.body}</li>))}
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
