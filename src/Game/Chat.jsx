import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import './Chat.scss';

const Chat = () => (
  <div className="chat position-relative">
    <div className="message-history" />
    <InputGroup className="type_msg mb-3">
      <FormControl
        placeholder="Type a message"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
      <InputGroup.Text className="btn btn-primary" id="basic-addon1"><i className="fas fa-paper-plane" /></InputGroup.Text>
    </InputGroup>
  </div>

);

export default Chat;
