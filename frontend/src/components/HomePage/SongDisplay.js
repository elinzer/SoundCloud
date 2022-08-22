import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as songActions from '../../store/songs';

const DisplayAllSongs = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const songList = useSelector(state => state.songs)

    const songArr = songList.Songs;

    useEffect(() => {
        dispatch(songActions.getSongs());
    }, [dispatch])



    if (sessionUser) {

        const userSongs = songArr.filter(song => {
            return song.id === sessionUser.id ? song.title : null
        })
        
        return (
            <div>
                <div>Your Library:</div>
                <ul>
                    {userSongs.map(song => {
                        return (
                            <li key={song.id}>{song.imageUrl}, {song.title}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <ul>
                {songArr.map(song => {
                    return (<li key={song.id}>
                        {song.imageUrl}, {song.title}
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default DisplayAllSongs;
