import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as songActions from '../../store/songs';
import DeleteSong from '../DeleteSong';
import EditSongFormModal from '../EditSongForm';
import { NavLink } from 'react-router-dom';
import '../../css/SongDisplay.css';
import '../../css/SongPage.css';

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
                <h3>Your Library:</h3>
                <div className='song-list-container'>
                    {userSongs.map(song => {
                        return (
                            <div className='song-box'>
                                <div className='image-icon-holder' style={{ position: 'relative', width: 'max-content' }}>
                                <img className='song-img' src={song.imageUrl}></img>
                                <div className='play-icon-div'>
                                    <i className="fa-solid fa-circle-play" />
                                </div>
                                </div>
                                <div>
                                    <NavLink key={song.id} to={`/songs/${song.id}`}>{song.title}
                                    </NavLink>
                                </div>
                                <div>
                                    <EditSongFormModal song={song} />
                                    <DeleteSong song={song} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className='song-list-container'>
            {songList.map(song => {
                return (
                    <div className='song-box'>
                        <img className='song-img' src={song.imageUrl}></img>
                        <NavLink key={song.id} to={`/songs/${song.id}`}>
                            <div className='title-card'>
                                {song.title}
                            </div>
                        </NavLink>
                    </div>)
            })}
        </div>
    )
}

export default DisplayAllSongs;
