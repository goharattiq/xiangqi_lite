/* eslint-disable import/prefer-default-export */
import { MESSAGE_SEND } from './type';

export const messageSend = (message) => ({
  type: MESSAGE_SEND,
  payload: message,
});
