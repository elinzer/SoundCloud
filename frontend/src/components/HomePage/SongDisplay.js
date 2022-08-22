import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as songActions from '../../store/songs';

const DisplayAllSongs = () => {
    const dispatch = useDispatch();
    const songList = useSelector(state => {
        return state.songs
    })

    console.log(songList.Songs)

    useEffect(() => {
        dispatch(songActions.getSongs());
    }, [dispatch])

    return (
        <div>
            <ul>
                {songList.Songs.map(song => {
                    return (<li>
                        {song.imageUrl}, {song.title}
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default DisplayAllSongs;
