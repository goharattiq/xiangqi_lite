import { MESSAGE_SEND } from './type';

const initialState = [];

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_SEND:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default chatReducer;
