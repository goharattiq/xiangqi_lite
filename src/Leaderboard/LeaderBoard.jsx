/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetechedLeaders } from '../redux/leaderboard/thunk';
import LeaderCard from './LeaderCard';

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const leaders = useSelector((state) => (state.leaders));
  useEffect(() => {
    dispatch(fetechedLeaders());
  }, []);
  return (
    <div className="row justify-content-center m-5">
      {
          leaders ? Object.entries(leaders).map(([id, leader]) => (
            <LeaderCard leader={leader} key={leader.username} />
          )) : ''
    }
    </div>
  );
};

export default LeaderBoard;
