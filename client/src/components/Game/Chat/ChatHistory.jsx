import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/Chat.scss';

const ChatHistory = () => {
  const chat = useSelector((state) => state.chat);
  return (
    <div className="message-history">
      {
        chat.length ? chat.map(({ content, author }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className=" mt-3 ps-2 border-dark message" key={index}>
            <Link to={`/profile/${author}`} className="profile-link">
              <span className="author">
                {author}
              </span>
            </Link>

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
