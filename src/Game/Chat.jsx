import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { messageSend } from '../redux/chat/actions';
import './Chat.scss';
import ChatHistory from './ChatHistory';

const Chat = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    content: '',
    author: '',
  });
  const { content } = message;
  const handleChange = ({ target: { name, value } }) => {
    setMessage({
      ...message,
      [name]: value,
      author: 'goharattiq',
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(messageSend(message));
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
