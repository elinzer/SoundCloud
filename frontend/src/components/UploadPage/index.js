import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/songs';

const UploadPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [songTitle, setSongTitle] = useState('');
    const [description, setDescription] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();

        

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Song Title:
                    <input
                        type='text'
                        name='title'
                        placeholder="song title"
                        required
                    ></input>
                </label>
                <label>Description:
                    <input
                        type='text'
                        name='description' placeholder="description"
                        required
                    ></input>
                </label>
                <label>
                    File/Url:
                    <input
                        type='text'
                        name='url'
                        placeholder="file/url"
                        required
                    ></input>
                </label>
                <label>
                    Cover Image:
                    <input
                        type='text'
                        name='imageUrl'
                        placeholder="cover image url"
                        required
                    ></input>
                </label>
                <button type="submit">Upload Song</button>
            </form>
        </div>
    )
}

export default UploadPage;
