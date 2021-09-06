/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './LeaderBoard.scss';

const LeaderCard = ({ leader }) => {
  const stateList = {
    games_played_count: 'Games',
    wins_count: 'Wins',
    losses_count: 'Losses',
    draw_count: 'Draws',
    winning_percentage: 'Winning%',
  };
  return (
    <Card className="col-lg-2 col-md-4 col-sm-3 col-5 m-3">
      <div className="avatar m-2" />
      <Card.Body>
        <Card.Title className="d-flex justify-content-center">{leader.user.username}</Card.Title>
        <Card.Text className="d-flex justify-content-center">{leader.rating}</Card.Text>
        <table className="d-flex justify-content-center">
          <tbody>
            {
              Object.entries(stateList).map(([id, stat]) => (
                <tr key={stat}>
                  <td>{stat}</td>
                  <td>{stat === 'Winning%' ? leader[id].toFixed(2) : leader[id]}</td>
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
  leader: PropTypes.object.isRequired,
};

export default LeaderCard;
