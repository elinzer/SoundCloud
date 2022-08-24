import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as commentActions from '../../store/comments';
import { useEffect } from 'react';

const SongPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const song = useSelector(state => state.songs.find(song => song.id == id))
    const commentState = useSelector(state => state.comments)

    const commentsArr = Object.values(commentState)


    const data = {
        id
    }

    useEffect(() => {
        dispatch(commentActions.getComments(data))
    }, [dispatch])


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
            </ul>
        </div>
    )
}

export default SongPage;
