import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as commentActions from '../../store/comments';
import { useEffect } from 'react';

const SongPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const song = useSelector(state => state.songs.find(song => song.id == id))
    const commentState = useSelector(state => state.comments)

    console.log(commentState)

    useEffect(() => {
        dispatch(commentActions.getComments(id))
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
                <li>COMMENTS HERE</li>
            </ul>
        </div>
    )
}

export default SongPage;
