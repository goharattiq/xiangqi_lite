/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { messageSend } from '../redux/chat/actions';
import './Chat.scss';

const Chat = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
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
      <div className="message-history">
        {
          // eslint-disable-next-line no-shadow
          chat.length !== 0 ? chat.map(({ content, author }, index) => (
            <div className="message" key={index}>
              <p>
                {content}
              </p>
              <span className="author">
                {author}
              </span>
            </div>
          )) : ''
        }
      </div>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="type_msg mb-3">
          <FormControl
            type="text"
            name="content"
            value={content}
            onChange={handleChange}
            placeholder="Type a message"
          />
          <Button className="btn btn-primary" id="basic-addon1" type="submit"><i className="fas fa-paper-plane" /></Button>
        </InputGroup>
      </Form>
    </div>

  );
};

export default Chat;
