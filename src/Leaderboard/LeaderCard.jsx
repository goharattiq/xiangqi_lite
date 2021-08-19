import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { fetechedLeaderStats } from '../redux/leaderboard/thunk';
import './LeaderBoard.scss';

const LeaderCard = ({ leader }) => {
  const dispatch = useDispatch();
  const stats = useSelector(({ leaderBoard }) => leaderBoard.stats);
  const profile = stats ? stats[leader.username] : null;
  useEffect(() => {
    dispatch(fetechedLeaderStats(leader.username));
  }, []);
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
        <Card.Title className="d-flex justify-content-center">{leader.username}</Card.Title>
        <Card.Text className="d-flex justify-content-center">{leader.rating}</Card.Text>
        <table className="d-flex justify-content-center">
          <tbody>
            {
              profile
                ? Object.entries(stateList).map(([id, stat]) => (
                  <tr key={stat}>
                    <td>{stat}</td>
                    <td>{profile[id]}</td>
                  </tr>
                )) : null
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
