import { v4 as uuidv4 } from 'uuid';
import { SET_TOAST, REMOVE_TOAST } from './type';

export const setToast = (msg, type) => ({
  type: SET_TOAST,
  payload: { msg, type, id: uuidv4() },

});

export const removeToast = (id) => ({
  type: REMOVE_TOAST,
  payload: id,
});
