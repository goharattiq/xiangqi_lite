import React, { useState } from 'react';
import AuthTab from './AuthTab';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authentication = () => {
  const SIGNIN = true;
  const [activeTab, setActiveTab] = useState(SIGNIN);
  const clickTabHandler = ({ target: { id } }) => {
    if (id === 'signin') setActiveTab(SIGNIN);
    else setActiveTab(!SIGNIN);
  };
  return (
    <>
      <AuthTab
        clickTabHandler={clickTabHandler}
        activeTab={activeTab}
      />
      { activeTab ? (<SignIn />) : (<SignUp />)}
    </>
  );
};

export default Authentication;
