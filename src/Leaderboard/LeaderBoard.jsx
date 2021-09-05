import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetechedLeaders } from '../redux/leaderboard/thunk';
import LeaderCard from './LeaderCard';

const LeaderBoard = () => {
  document.body.style.backgroundColor = '#ede8e0';
  const dispatch = useDispatch();
  const leaders = useSelector((state) => (state.leaderBoard.leaders));
  useEffect(() => {
    dispatch(fetechedLeaders());
  }, []);
  return (
    <div className="row justify-content-center leaderboard">
      {
        leaders.length !== 0 ? leaders.map((leader) => (
          <LeaderCard leader={leader} key={leader.user.username} />
        )) : ''
      }
    </div>
  );
};

export default LeaderBoard;
