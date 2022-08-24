import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as songActions from '../../store/songs';
import DeleteSong from '../DeleteSong';
import EditSongFormModal from '../EditSongForm';
import { NavLink, Route } from 'react-router-dom';

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
                            <div>
                                <NavLink key={song.id} to={`/songs/${song.id}`}>{song.imageUrl}, {song.title}
                                </NavLink>
                                <EditSongFormModal song={song} />
                                <DeleteSong song={song} />
                            </div>
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
                    return (
                        <div>
                            <NavLink key={song.id} to={`/songs/${song.id}`}>{song.imageUrl}, {song.title}
                            </NavLink>
                        </div>)
                })}
            </ul>
        </div>
    )
}

export default DisplayAllSongs;
