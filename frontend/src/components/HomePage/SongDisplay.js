import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as songActions from '../../store/songs';
import EditSongFormModal from '../EditSongForm';

const DisplayAllSongs = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => {
        return state.session.user
    })
    const songList = useSelector(state => {
        return state.songs
    })

    useEffect(() => {
        dispatch(songActions.getSongs());
    }, [dispatch])


    if (sessionUser) {
        let userSongs = songList.filter(song => {
            return song.userId === sessionUser.id
        })

        return (
            <div>
                <div>Your Library:</div>
                <ul>
                    {userSongs.map(song => {
                        return (
                            <li key={song.id}>{song.imageUrl}, {song.title}
                            <EditSongFormModal />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <ul>
                {songList.map(song => {
                    return (<li key={song.id}>
                        {song.imageUrl}, {song.title}
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default DisplayAllSongs;
