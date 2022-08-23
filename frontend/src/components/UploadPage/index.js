import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/songs';

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
    }

    if (!sessionUser) {
        return (
            <div>
                Please log in to upload!
            </div>
        )
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Song Title:
                    <input
                        type='text'
                        value={title}
                        placeholder="song title"
                        onChange={(e) => setSongTitle(e.target.value)}
                        required
                    ></input>
                </label>
                <label>Description:
                    <input
                        type='text'
                        value={description}
                        placeholder="description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></input>
                </label>
                <label>
                    File/Url:
                    <input
                        type='text'
                        value={url}
                        placeholder="file/url"
                        onChange={(e) => setSongUrl(e.target.value)}
                        required
                    ></input>
                </label>
                <label>
                    Cover Image:
                    <input
                        type='text'
                        value={imageUrl}
                        placeholder="cover image url"
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    ></input>
                </label>
                <button type="submit">Upload Song</button>
            </form>
        </div>
    )
}

export default UploadPage;
