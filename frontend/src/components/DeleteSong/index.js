import { useDispatch } from "react-redux";
import * as songActions from '../../store/songs';

const DeleteSong = ({ song }) => {

    const dispatch = useDispatch();


    const handleClick = (e) => {
        e.preventDefault();

        const songToDelete = {
            id: song.id
        }

        dispatch(songActions.deleteSong(songToDelete))
    }


    return (
        <>
            <button onClick={handleClick}>
            <i className="fa-regular fa-trash-can" />
                Delete</button>
        </>
    )
}

export default DeleteSong;
