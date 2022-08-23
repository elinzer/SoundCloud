import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSongForm from "./EditSongForm";



function EditSongFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSongForm />
                </Modal>

            )}
        </>
    )
}

export default EditSongFormModal;
