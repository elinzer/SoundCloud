import { useSelector } from 'react-redux';
import DeleteSong from '../DeleteSong';
import EditSongFormModal from '../EditSongForm';
import { NavLink } from 'react-router-dom';
import '../../css/SongDisplay.css';
import '../../css/SongPage.css';
import defaultImage from '../../images/notsoundcloud.png';
// import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';

const DisplayAllSongs = ({ audioProp }) => {

    const [songAudio, setSongAudio] = audioProp;

    const sessionUser = useSelector(state => {
        return state.session.user
    })
    const songList = useSelector(state => {
        return state.songs
    })

    // let player = useRef(null);
    // <AudioPlayer ref={player} />
    // console.log(player.current)

    const handleClick = (e) => {
       e.target.className = 'hidden-button';
       e.target.id = 'now-playing';
    }

    return (
        <div className='outer-outer'>
            <div className='song-list-container'>
                {songList.map(song => {
                    return (
                        <div className='song-box'>
                            <div className='image-icon-holder' style={{ position: 'relative', width: 'max-content' }}>
                                <NavLink to={`/songs/${song.id}`}>
                                    <img alt='' className='song-img'
                                        src={song.imageUrl}
                                        onError={(e) => e.target.src = defaultImage}>
                                    </img>
                                </NavLink>
                                <div className='play-icon-div'>
                                    <i className="fa-solid fa-circle-play" onClick={(e) => { setSongAudio(song.url); handleClick(e) }} />
                                </div>
                            </div>
                            <NavLink className='song-link' key={song.id} to={`/songs/${song.id}`}>
                                <div className='title-card'>
                                    {song.title}
                                </div>
                            </NavLink>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default DisplayAllSongs;
