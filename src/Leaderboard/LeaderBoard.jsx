import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../Components/Spinner';
import { fetechedLeaders } from '../redux/leaderboard/thunk';
import LeaderCard from './LeaderCard';

const LeaderBoard = ({ leaders }) => (
  <div className="row justify-content-center leaderboard">
    {
        leaders.map((leader) => (
          <LeaderCard leader={leader} key={leader.user.username} />
        ))
    }
  </div>
);

const LeaderBoardWithSpinner = Spinner(LeaderBoard);

const LearBoardContainer = () => {
  document.body.style.backgroundColor = '#ede8e0';
  const dispatch = useDispatch();
  const leaders = useSelector((state) => (state.leaderBoard.leaders));
  useEffect(() => {
    dispatch(fetechedLeaders());
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

export default LearBoardContainer;
