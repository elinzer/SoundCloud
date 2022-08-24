import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as songActions from '../../store/songs';

function EditSongForm({song, modalProp}) {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = modalProp;
    const [title, setSongTitle] = useState(song.title);
    const [description, setDescription] = useState(song.description);
    const [url, setSongUrl] = useState(song.url);
    const [imageUrl, setImageUrl] = useState(song.imageUrl);
    const [albumId, setAlbumId] = useState(null);
    const [errors, setErrors] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedSong = {
            id: song.id,
            title,
            description,
            url,
            imageUrl,
            albumId
        }
        dispatch(songActions.updateSong(updatedSong))

        setShowModal(false);

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title:
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setSongTitle(e.target.value)}
                        required
                    ></input>
                </label>
                <label>Description:
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></input>
                </label>
                <label>Url:
                    <input
                        type='text'
                        value={url}
                        onChange={(e) => setSongUrl(e.target.value)}
                        required
                    ></input>
                </label>
                <label>Cover art:
                    <input
                        type='text'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    ></input>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditSongForm;
