import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSongForm from "./EditSongForm";




function EditSongFormModal({song}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
            <i className="fa-regular fa-pen-to-square" />
                Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSongForm song={song} modalProp={[showModal, setShowModal]}/>
                </Modal>

            )}
        </>
    )
}

export default EditSongFormModal;
