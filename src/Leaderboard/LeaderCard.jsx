import React from 'react';
import { Card } from 'react-bootstrap';

const LeaderCard = () => {
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
        <Card.Title className="d-flex justify-content-center">Name</Card.Title>
        <Card.Text className="d-flex justify-content-center">Rating</Card.Text>
        {
          stateList.map(() => (
            <Card.Text className="d-flex justify-content-center">
              <p>Game</p>
              <p>Score</p>
            </Card.Text>
          ))
        }

      </Card.Body>
    </Card>
  );
};

export default LeaderCard;
