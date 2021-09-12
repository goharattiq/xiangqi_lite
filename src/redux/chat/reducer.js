import { CLEAR_CHAT, MESSAGE_SEND } from './type';

const initialState = [];

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_SEND:
      return [...state, action.payload];
    case CLEAR_CHAT:
      return initialState;
    default:
      return state;
  }
};

export default chatReducer;
