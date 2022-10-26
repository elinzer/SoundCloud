import { useEffect, useState } from "react";
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
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];

        if (!url.endsWith('.mp3')) errors.push('Music file must be an mp3');

        setValidationErrors(errors);

    }, [url])


    const handleSubmit = (e) => {
        e.preventDefault();


        setHasSubmitted(true);

        if (validationErrors.length) {
            return alert('Please fix errors before submitting');
        } else {
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
            setSongUrl('');
            setHasSubmitted(false);

            alert(`Successfully uploaded`)
        }

    }

    if (!sessionUser) {
        return (
            <div>
                <h2>
                    Please log in to upload!
                </h2>
            </div>
        )
    }


    return (
        <div className="upload-page">
            <div className="middle-upload">
            <form className="upload-container" onSubmit={handleSubmit}>
                <h3>Upload a new song:</h3>
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul className="upload-errors">
                        {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                )}
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
                        Song Url:
                    <input
                        type='text'
                        value={url}
                        placeholder="song url"
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
                <button type="submit" className="upload-form-submit">Upload Song</button>
                <span><NavLink to='/library' className="view-library-link">View Library
                </NavLink></span>
            </form>
            </div>
        </div>
    )
}

export default UploadPage;
