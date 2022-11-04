import * as albumActions from '../../store/albums';
import { useDispatch, useSelector } from 'react-redux';
import albumCover from '../../images/albumcover.png';
import '../../css/Albums.css';
import { NavLink } from 'react-router-dom';

const Albums = () => {

    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums);
    const albumList = Object.values(albums);


    return (
        <div>
            <div className='header-div'><h3>Check out these Albums:</h3></div>
            <div className='album-list'>
                {albumList?.map((album) => {
                    return (
                        <div className='album-card'>
                            <img src={album.imageUrl}
                                className='album-img'
                                onError={(e) => e.target.src = albumCover}
                            />
                            <div><NavLink to={`/albums/${album.id}`}>{album.title}</NavLink></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Albums;
