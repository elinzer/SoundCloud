import { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/songs';
import '../../css/UploadPage.css'

const UploadPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setSongTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setSongUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState(null);
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const info = {
            userId: sessionUser.id,
            albumId,
            title,
            description,
            url,
            imageUrl
        }

        dispatch(songActions.addSong(info))

        setSongTitle('');
        setDescription('');
        setImageUrl('');
        setSongUrl('')

        alert(`Successfully uploaded`)
    }

    if (!sessionUser) {
        return (
            <div>
                Please log in to upload!
            </div>
        )
    }


    return (
        <div className="upload-page">
            <form className="upload-container" onSubmit={handleSubmit}>
                <h3>Upload a new song:</h3>
                <label className="upload-input">Song Title:
                    <input
                        type='text'
                        value={title}
                        placeholder="song title"
                        onChange={(e) => setSongTitle(e.target.value)}
                        required
                    ></input>
                </label>
                <label className="upload-input">Description:
                    <input
                        type='text'
                        value={description}
                        placeholder="description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></input>
                </label>
                <label className="upload-input">
                    File/Url:
                    <input
                        type='text'
                        value={url}
                        placeholder="file/url"
                        onChange={(e) => setSongUrl(e.target.value)}
                        required
                    ></input>
                </label>
                <label className="upload-input">
                    Cover Image:
                    <input
                        type='text'
                        value={imageUrl}
                        placeholder="cover image url"
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    ></input>
                </label>
                <div className="bottom-buttons">
                <button type="submit" className="upload-form-submit">Upload Song</button>
            <NavLink to='/'><button className="view-library">View Library</button></NavLink>
                </div>
            </form>
        </div>
    )
}

export default UploadPage;
