import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './LeaderBoard.scss';

const LeaderCard = ({ leader }) => {
  const stateList = [
    'Games',
    'Wins',
    'Losses',
    'Draws',
    'Winning%',
  ];
  return (
    <Card className="col-lg-2 col-md-4 col-sm-3 col-5 m-3">
      <div className="avatar m-2" />
      <Card.Body>
        <Card.Title className="d-flex justify-content-center">{leader.username}</Card.Title>
        <Card.Text className="d-flex justify-content-center">{leader.rating}</Card.Text>
        <table className="d-flex justify-content-center">
          <tbody>
            {
          stateList.map((stat) => (
            <tr key={stat}>
              <td>{stat}</td>
              <td>Score</td>
            </tr>
          ))
        }
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

LeaderCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  leader: PropTypes.object.isRequired,
};

export default LeaderCard;
