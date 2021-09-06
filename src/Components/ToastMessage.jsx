import React from 'react';

import { Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { removeToast } from '../redux/toast/actions';
import './ToastMessage.scss';

const ToastMessage = () => {
  const dispatch = useDispatch();
  const toasts = useSelector(({ toast }) => (toast));
  return (
    <ToastContainer position="top-end" className="p-3">
      {
        toasts.length !== 0 ? toasts.map(({ msg, type, id }) => (
          <Toast
            animation
            onClose={() => dispatch(removeToast(id))}
            className={`bg-${type} toast`}
            key={id}
          >
            <Toast.Header />
            <Toast.Body>{msg}</Toast.Body>
          </Toast>
        )) : ''
      }
    </ToastContainer>
  );
};

export default ToastMessage;
