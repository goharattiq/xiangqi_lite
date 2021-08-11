import {
  GET_PROFILE,
} from './type';

const initialState = {

};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
