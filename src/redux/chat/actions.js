import { CLEAR_CHAT, SEND_MESSAGE } from './type';

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const clearChat = (message) => ({
  type: CLEAR_CHAT,
  payload: message,
});
