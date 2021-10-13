import { v4 as uuidv4 } from 'uuid';

import { TOAST_TIMEOUT_SECONDS } from '../../utilis/constants';
import { SET_TOAST, REMOVE_TOAST } from './type';

export const setToast = (msg, type, dispatch, data) => {
  const id = uuidv4();
  setTimeout(() => {
    dispatch(removeToast(id));
  }, TOAST_TIMEOUT_SECONDS * 1000);
  return ({
    type: SET_TOAST,
    payload: {
      msg, type, id, data,
    },
  });
};

export const removeToast = (id) => ({
  type: REMOVE_TOAST,
  payload: id,
});
