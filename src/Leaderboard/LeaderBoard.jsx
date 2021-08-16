import React from 'react';
import LeaderCard from './LeaderCard';

const LeaderBoard = () => {
  const leader = ['Ali', 'Zubair', 'Imran'];
  return (
    <div className="row justify-content-center m-5">
      {
      leader.map(() => (
        <LeaderCard />
      ))
    }
    </div>
  );
};

export default LeaderBoard;
