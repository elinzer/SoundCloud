import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import albumCover from '../../images/albumcover.png';

const AlbumDetail = () => {

    const { id } = useParams();
    const albumState = useSelector(state => state.albums);
    const albums = Object.values(albumState);
    const album = albums?.find(album => album.id == id)
    const songState = useSelector(state => state.songs);
    const songs = Object.values(songState);
    const albumSongs = songs?.filter(song => song.albumId == id);

    return (
        <div>
            <h3>{album?.title}</h3>
            <img src={album?.imageUrl}
            onError={(e) => e.target.src = albumCover }
            alt={album?.title} />
            <div>{album?.description}</div>
            <ul>
                {albumSongs?.map(song => (
                    <li key={song.id}>{song.title},<img src={song.imageUrl}></img></li>))}
            </ul>
        </div>
    )

}

export default AlbumDetail;
