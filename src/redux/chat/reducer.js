import { CLEAR_CHAT, SEND_MESSAGE } from './type';

const initialState = [];

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, action.payload];
    case CLEAR_CHAT:
      return initialState;
    default:
      return state;
  }
};

export default chatReducer;
