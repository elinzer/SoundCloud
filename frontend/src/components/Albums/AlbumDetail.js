import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import albumCover from '../../images/albumcover.png';
import '../../css/AlbumDetail.css'
import EditAlbumFormModal from "./EditAlbum";

const AlbumDetail = () => {

    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams();
    const albumState = useSelector(state => state.albums);
    const albums = Object.values(albumState);
    const album = albums?.find(album => album.id == id)
    const songState = useSelector(state => state.songs);
    const songs = Object.values(songState);
    const albumSongs = songs?.filter(song => song.albumId == id);
    let myAlbum = sessionUser?.id === album?.userId;

    return (
        <div className="album-page">
            <div className="album-banner">
                <div className="name-desc">
                    <div className="album-name">{album?.title}
                    </div>
                    <div className="album-desc">{album?.description}
                    </div>
                    {myAlbum && (<EditAlbumFormModal album={album} />)}
                </div>
                <img src={album?.imageUrl}
                    className="album-cover"
                    onError={(e) => e.target.src = albumCover}
                    alt={album?.title} />
            </div>
            <div className="song-list">
                {albumSongs?.map((song, ind) => (
                    <div key={ind} className='single-song'>
                        <div>
                            <img src={song.imageUrl} className='single-song-img'></img>
                        </div>
                        <div>{ind + 1}. <NavLink className='song-link' to={`/songs/${song.id}`}>{song.title}</NavLink></div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default AlbumDetail;
