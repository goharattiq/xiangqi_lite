import {
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
} from './type';

// const initialState = localStorage.getItem('access_token')
// ? localStorage.getItem('access_token') : null;
const initialState = null;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      // console.log(action.payload.access_token);
      // localStorage.setItem('access_token', action.payload.access_token);
      return {
        ...state,
        ...action.payload,
      };
    case SIGNOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};

export default authReducer;
