import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import ToastMessage from '../Components/ToastMessage';
import { fetechUser } from '../redux/auth/thunk';
import { BACKGROUND, SIGNIN } from '../utilis/constants';
import AuthTab from './AuthTab';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authentication = () => {
  document.body.style.backgroundColor = BACKGROUND;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(SIGNIN);
  const clickTabHandler = ({ target: { id } }) => {
    setActiveTab(id);
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      dispatch(fetechUser());
    }
  }, []);
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
