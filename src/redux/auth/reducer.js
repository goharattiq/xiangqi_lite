import {
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
} from './type';

const initialState = {

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
