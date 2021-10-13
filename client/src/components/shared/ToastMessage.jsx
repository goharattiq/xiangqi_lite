import React from 'react';

import { Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeToast } from '../../redux/toast/actions';
import './styles/ToastMessage.scss';

const ToastMessage = () => {
  const dispatch = useDispatch();
  const { toasts, user } = useSelector(({ toast, auth }) => ({
    toasts: toast,
    user: auth ? auth.user : '',
  }));
  return (
    <ToastContainer position="top-end" className="p-3 toast-container">
      {
        toasts.length > 0 && toasts.map(({
          msg, type, id, data,
        }) => (
          <Toast
            animation
            onClose={() => dispatch(removeToast(id))}
            className={`bg-${type} toast`}
            key={id}
          >
            <Toast.Header />
            <Toast.Body>
              {
                data && data.creator !== user.username ? (
                  <>
                    <p>{`${data.creator} created the game.`}</p>
                    {
                      user.username === data.invitee && <p>{`${data.creator} challenged you to a game`}</p>
                    }
                    <Link to={`game/${data.gameID}`}>
                      {
                        user.username === data.invitee ? 'join' : 'view'
                      }
                    </Link>
                  </>
                ) : msg
              }
            </Toast.Body>
          </Toast>
        ))
      }
    </ToastContainer>
  );
};

export default ToastMessage;
