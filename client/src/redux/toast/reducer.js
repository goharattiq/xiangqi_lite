import { SET_TOAST, REMOVE_TOAST } from './type';

const initialState = [];

const toastReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOAST:
      return [
        ...state,
        payload,
      ];
    case REMOVE_TOAST:
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

export default toastReducer;
