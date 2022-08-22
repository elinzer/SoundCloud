import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as songActions from '../../store/songs';

const DisplayAllSongs = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const songList = useSelector(state => state.songs)

    useEffect(() => {
        dispatch(songActions.getSongs());
    }, [dispatch])

    console.log(songList)

    if (sessionUser) {

        const userSongs = songList.Songs.filter(song => {
            return song.id === sessionUser.id ? song.title : null
        })
        return (
            <div>
                <div>Your Library:</div>
                <ul>
                    {userSongs.map(song => {
                        return (
                            <li>{song.imageUrl}, {song.title}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }

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
