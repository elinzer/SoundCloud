import { useSelector} from 'react-redux';
import DeleteSong from '../DeleteSong';
import EditSongFormModal from '../EditSongForm';
import { NavLink } from 'react-router-dom';
import '../../css/SongDisplay.css';
import '../../css/SongPage.css';
import defaultImage from '../../images/notsoundcloud.png';

const DisplayAllSongs = ({ audioProp }) => {

    const [songAudio, setSongAudio] = audioProp;


    const sessionUser = useSelector(state => {
        return state.session.user
    })
    const songList = useSelector(state => {
        return state.songs
    })


    // if (sessionUser) {
    //     let userSongs = songList.filter(song => {
    //         return song.userId === sessionUser.id
    //     })

    //     return (
    //         <div>
    //             <h3>Your Library:</h3>
    //             <div>{userSongs.length === 0 ? "You don't have any songs yet! Why not upload one?" : null}</div>
    //             <div className='song-list-container'>
    //                 {userSongs.map(song => {
    //                     return (
    //                         <div className='song-box'>
    //                             <div className='image-icon-holder' style={{ position: 'relative', width: 'max-content' }}>
    //                                 <img alt='' className='song-img'
    //                                     src={song.imageUrl}
    //                                     onError={(e) => e.target.src = defaultImage}>
    //                                 </img>
    //                                 <div className='play-icon-div'>
    //                                     <i className="fa-solid fa-circle-play" onClick={() => setSongAudio(song.url)} />
    //                                 </div>
    //                             </div>
    //                             <div>
    //                                 <NavLink className='song-link' key={song.id} to={`/songs/${song.id}`}>{song.title}
    //                                 </NavLink>
    //                             </div>
    //                             <div>
    //                                 <EditSongFormModal song={song} />
    //                                 <DeleteSong song={song} />
    //                             </div>
    //                         </div>
    //                     )
    //                 })}
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className='song-list-container'>
            {songList.map(song => {
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
                        <NavLink className='song-link' key={song.id} to={`/songs/${song.id}`}>
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
