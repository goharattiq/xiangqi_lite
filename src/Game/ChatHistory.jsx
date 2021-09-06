/* eslint-disable react/no-array-index-key */
import React from 'react';

import { useSelector } from 'react-redux';
import './Chat.scss';

const ChatHistory = () => {
  const chat = useSelector((state) => state.chat);
  return (
    <div className="message-history">
      {
          chat.length !== 0 ? chat.map(({ content, author }, index) => (
            <div className=" mt-3 ps-2 border-dark message" key={index}>
              <span className="author">
                {author}
              </span>
              <p className="content">
                {content}
              </p>
            </div>
          )) : ''
        }
    </div>
  );
};

export default ChatHistory;
