import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SignIn, SignUp, AuthTab } from '../components/Authentication';
import ToastMessage from '../components/shared/ToastMessage';
import { BACKGROUND, SIGNIN } from '../utilis/constants';

const Authentication = () => {
  document.body.style.backgroundColor = BACKGROUND;
  const history = useHistory();
  const auth = useSelector((state) => (state.auth));
  const [activeTab, setActiveTab] = useState(SIGNIN);
  const clickTabHandler = ({ target: { id } }) => {
    setActiveTab(id);
  };

  useEffect(() => {
    if (auth) {
      history.push('/');
    }
  }, [auth]);
  return (
    <>
      <ToastMessage />
      <AuthTab
        clickTabHandler={clickTabHandler}
        activeTab={activeTab}
      />
      {activeTab === SIGNIN ? (<SignIn />) : (<SignUp />)}
    </>
  );
};

export default Authentication;
