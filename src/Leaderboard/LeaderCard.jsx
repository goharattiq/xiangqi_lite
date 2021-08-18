import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const LeaderCard = ({ leader }) => {
  const stateList = [
    'Games',
    'Wins',
    'Losses',
    'Draws',
    'Winning%',
  ];
  return (
    <Card className="col-2 m-3">
      <div className="avatar m-5" />
      <Card.Body>
        <Card.Title className="d-flex justify-content-center">{leader.username}</Card.Title>
        <Card.Text className="d-flex justify-content-center">{leader.rating}</Card.Text>
        {
          stateList.map((stat) => (
            <Card.Text className="d-flex justify-content-center" key={stat}>
              <span className="">{stat}</span>
              <span className="ps-5">Score</span>
            </Card.Text>
          ))
        }

      </Card.Body>
    </Card>
  );
};

LeaderCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  leader: PropTypes.object.isRequired,
};

export default LeaderCard;
