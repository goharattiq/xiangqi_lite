import {
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
} from './type';

const initialState = null;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
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
