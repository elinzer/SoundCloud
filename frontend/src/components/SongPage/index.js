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
                    <textarea minLength='15' placeholder='I love this song...' wrap='soft'></textarea>
                    <br />
                    <button type='submit'>Post comment</button>
                    </div>
            </ul>
        </div>
    )
}

export default SongPage;
