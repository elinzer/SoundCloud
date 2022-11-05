import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditAlbumForm from "./EditAlbumForm";
import '../../../css/EditAlbumForm.css';

function EditAlbumFormModal({album}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="album-edit-button" onClick={() => setShowModal(true)}>
                Edit Album Info</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditAlbumForm album={album} modalProp={[showModal, setShowModal]}/>
                </Modal>

            )}
        </>
    )
}

export default EditAlbumFormModal;
