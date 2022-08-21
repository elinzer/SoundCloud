import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from "./SignupForm";
import './SignupForm.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create-acct-button' onClick={() => setShowModal(true)}>Create account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
