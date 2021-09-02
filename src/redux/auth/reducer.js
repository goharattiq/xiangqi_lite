import {
  GET_USER,
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
} from './type';

const initialState = null;

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNIN_SUCCESS:
      localStorage.setItem('access_token', payload.access_token);
      return {
        ...state,
        ...payload,
      };
    case GET_USER:
      return {
        access_token: localStorage.getItem('access_token'),
        user: payload,
      };
    case SIGNUP_SUCCESS:
    case SIGNOUT_SUCCESS:
      localStorage.removeItem('access_token');
      return null;
    default:
      return state;
  }
};

export default authReducer;
