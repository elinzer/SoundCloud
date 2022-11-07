import { useDispatch } from "react-redux";
import { useState } from "react";
import * as albumActions from "../../../store/albums";

const EditAlbumForm = ({ album, modalProp }) => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = modalProp;
    const [title, setAlbumTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const [imageUrl, setImageUrl] = useState(album.imageUrl);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedAlbum = {
            id: album.id,
            title,
            description,
            imageUrl,
        };

        dispatch(albumActions.updateAlbum(updatedAlbum));

        setShowModal(false);
    }


    return (
        <div className="edit-album-container">
            <form className="edit-album-form" onSubmit={handleSubmit}>
                <h3>Update this album:</h3>
                <label>Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setAlbumTitle(e.target.value)}
                        required
                    ></input>
                </label>
                <label>Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></input>
                </label>
                <label>Image Url:
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    ></input>
                </label>
                <button
                className="album-submit-button"
                type="submit">Update Album</button>
                </form>
            </div>
    )

}

export default EditAlbumForm;
