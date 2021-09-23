import React from 'react';

import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LeaderBoard.scss';

const LeaderCard = ({ leader }) => {
  const statList = {
    games_played_count: 'Games',
    wins_count: 'Wins',
    losses_count: 'Losses',
    draw_count: 'Draws',
    winning_percentage: 'Winning%',
  };
  return (
    <Card className="col-lg-2 col-md-4 col-sm-3 col-5 m-3">
      <img src={leader.photo} alt={leader.user.username} className="leader-avatar m-2" />
      <Card.Body>
        <Link to={`/profile/${leader.user.username}`} className="profile-link">
          <Card.Title className="d-flex justify-content-center">{leader.user.username}</Card.Title>
        </Link>

        <Card.Text className="d-flex justify-content-center">{leader.rating}</Card.Text>
        <table className="d-flex justify-content-center">
          <tbody>
            {
              Object.entries(statList).map(([id, stat]) => (
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
