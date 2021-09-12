import { CLEAR_CHAT, MESSAGE_SEND } from './type';

export const messageSend = (message) => ({
  type: MESSAGE_SEND,
  payload: message,
});

export const clearChat = (message) => ({
  type: CLEAR_CHAT,
  payload: message,
});
