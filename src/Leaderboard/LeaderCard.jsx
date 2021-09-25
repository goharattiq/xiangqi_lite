import React from 'react';

import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LeaderBoard.scss';

const LeaderCard = ({ leader }) => {
  const statList = {
    games_played_count: 'Games',
    wins_count: 'Wins',
    losses_count: 'Losses',
    draw_count: 'Draws',
    winning_percentage: 'Win%',
  };
  return (
    <Card className="col-lg-2 col-md-4 col-sm-3 col-5 m-3">
      <Avatar
        name={leader.user.username}
        src={leader.photo}
        className="position-relative start-50 leader-avatar mt-3"
        color="#815752"
      />
      <Card.Body className="mt-3">
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
                  <td>{leader[id]}</td>
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
