import React, { useState } from 'react';

import {
  Button,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { sendMessage } from '../../../redux/chat/actions';
import { socketSendMessage } from '../../../socketio/chatSocketio';
import ChatHistory from './ChatHistory';
import './styles/Chat.scss';

const Chat = () => {
  const dispatch = useDispatch();
  const { username, gameID } = useSelector(({ auth, game }) => ({
    username: auth.user.username,
    gameID: game.params.id,
  }));
  const [message, setMessage] = useState({
    content: '',
    author: '',
  });
  const { content } = message;
  const handleChange = ({ target: { name, value } }) => {
    setMessage({
      ...message,
      [name]: value,
      author: username,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendMessage(message));
    socketSendMessage(message, gameID);
    setMessage({
      content: '',
      author: '',
    });
  };
  return (
    <div className="chat position-relative">
      <ChatHistory />
      <Form onSubmit={handleSubmit}>
        <InputGroup className="type_msg mb-3">
          <FormControl
            type="text"
            name="content"
            value={content}
            onChange={handleChange}
            placeholder="Type a message"
          />
          <Button className="btn-send" type="submit"><i className="fas fa-paper-plane" /></Button>
        </InputGroup>
      </Form>
    </div>

  );
};

export default Chat;
