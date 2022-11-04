import { useSelector } from 'react-redux';
import DeleteSong from '../DeleteSong';
import EditSongFormModal from '../EditSongForm';
import { NavLink} from 'react-router-dom';
import '../../css/SongDisplay.css';
import '../../css/SongPage.css';
import defaultImage from '../../images/notsoundcloud.png';
import '../../css/Library.css';
import albumCover from '../../images/albumcover.png';

const Library = ({ audioProp }) => {
    const [songAudio, setSongAudio] = audioProp;

    const sessionUser = useSelector(state => {
        return state.session.user
    })
    const songList = useSelector(state => {
        return state.songs
    })
    const albums = useSelector(state => state.albums);
    const albumList = Object.values(albums);

    if (!sessionUser) {
        return (<h2 style={{ fontFamily: 'Overpass' }}>Please log in to see your library!</h2>)
    }


    if (sessionUser) {
        let userSongs = songList.filter(song => {
            return song.userId === sessionUser.id
        })
        let userAlbums = albumList.filter(album => {
            return album.userId === sessionUser.id
        })

        return (
            <div className='library-container'>
                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', width: '1260px' }}>
                    <h3 style={{ fontFamily: 'Overpass' }}>Your Songs:</h3>
                </div>
                <div>{userSongs.length === 0 ? "You don't have any songs yet! Why not upload one?" : null}</div>
                <div className='my-song-list'>
                    {userSongs.map(song => {
                        return (
                            <div className='song-box'>
                                <div className='image-icon-holder' style={{ position: 'relative', width: 'max-content' }}>
                                    <img alt='' className='song-img'
                                        src={song.imageUrl}
                                        onError={(e) => e.target.src = defaultImage}>
                                    </img>
                                    <div className='play-icon-div'>
                                        <i className="fa-solid fa-circle-play" onClick={(e) => {e.target.className = "fa-solid fa-circle-pause"; setSongAudio(song.url)}} />
                                    </div>
                                </div>
                                <div>
                                    <NavLink className='song-link' key={song.id} to={`/songs/${song.id}`}><div className='song-title'>{song.title}</div>
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
                <div>
                <div className='library-header-div'><h3>Your Albums:</h3></div>
            <div className='library-album-list'>
                {userAlbums?.map((album) => {
                    return (
                        <div className='library-album-card'>
                            <img src={album.imageUrl}
                                className='library-album-img'
                                onError={(e) => e.target.src = albumCover}
                            />
                            <div><NavLink to={`/albums/${album.id}`}>{album.title}</NavLink></div>
                        </div>
                    )
                })}
            </div>
                </div>
            </div>
        )
    }

}

export default Library;
