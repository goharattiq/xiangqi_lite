import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { LeaderCard } from '../components/Leaderboard';
import Spinner from '../components/shared/Spinner';
import { fetechLeaders } from '../redux/leaderboard/thunk';
import { BACKGROUND } from '../utilis/constants';
import './styles/LeaderBoard.scss';

const LeaderBoard = ({ leaders }) => (
  <div className="row justify-content-center w-100 leaderboard">
    {
      leaders.map((leader) => (
        <LeaderCard key={leader.user.username} leader={leader} />
      ))
    }
  </div>
);

const LeaderBoardWithSpinner = Spinner(LeaderBoard);

const LearderBoardContainer = () => {
  document.body.style.backgroundColor = BACKGROUND;
  const dispatch = useDispatch();
  const leaders = useSelector(({ leaderBoard }) => (leaderBoard.leaders));
  useEffect(() => {
    dispatch(fetechLeaders());
  }, []);
  return (
    <LeaderBoardWithSpinner
      isLoading={!leaders}
      leaders={leaders}
    />
  );
};

LeaderBoard.propTypes = {
  leaders: PropTypes.array.isRequired,
};

export default LearderBoardContainer;
