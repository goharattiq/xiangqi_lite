import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './ToastMessage.scss';

const ToastMessage = () => {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header />
        <Toast.Body>Message to show</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
