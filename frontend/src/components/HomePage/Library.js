import { useSelector } from 'react-redux';
import DeleteSong from '../DeleteSong';
import EditSongFormModal from '../EditSongForm';
import { NavLink } from 'react-router-dom';
import '../../css/SongDisplay.css';
import '../../css/SongPage.css';
import defaultImage from '../../images/notsoundcloud.png';
import bgImage from '../../images/Screen Shot 2022-08-25 at 8.14.10 PM.png';

const Library = ({ audioProp }) => {
    const [songAudio, setSongAudio] = audioProp;


    const sessionUser = useSelector(state => {
        return state.session.user
    })
    const songList = useSelector(state => {
        return state.songs
    })

    if (!sessionUser) {
        return (<h2 style={{fontFamily: 'Overpass'}}>Please log in to see your library!</h2>)
    }


    if (sessionUser) {
        let userSongs = songList.filter(song => {
            return song.userId === sessionUser.id
        })

        return (
            <div>

                <div className="container">
                    <img className="splash-page-bg" src={bgImage} alt='a concert'></img>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <h3 style={{fontFamily: 'Overpass'}}>Your Library:</h3>
                </div>
                <div>{userSongs.length === 0 ? "You don't have any songs yet! Why not upload one?" : null}</div>
                <div className='song-list-container'>
                    {userSongs.map(song => {
                        return (
                            <div className='song-box'>
                                <div className='image-icon-holder' style={{ position: 'relative', width: 'max-content' }}>
                                    <img alt='' className='song-img'
                                        src={song.imageUrl}
                                        onError={(e) => e.target.src = defaultImage}>
                                    </img>
                                    <div className='play-icon-div'>
                                        <i className="fa-solid fa-circle-play" onClick={() => setSongAudio(song.url)} />
                                    </div>
                                </div>
                                <div>
                                    <NavLink className='song-link' key={song.id} to={`/songs/${song.id}`}>{song.title}
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

}

export default Library;
