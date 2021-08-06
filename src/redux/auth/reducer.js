import { SGININ_SUCCESS } from './type';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SGININ_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
