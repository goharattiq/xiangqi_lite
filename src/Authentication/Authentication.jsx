import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import ToastMessage from '../Components/ToastMessage';
import { fetechedUser } from '../redux/auth/thunk';
import AuthTab from './AuthTab';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authentication = () => {
  document.body.style.backgroundColor = '#ede8e0';
  const dispatch = useDispatch();
  const SIGNIN = true;
  const [activeTab, setActiveTab] = useState(SIGNIN);
  const clickTabHandler = ({ target: { id } }) => {
    if (id === 'signin') setActiveTab(SIGNIN);
    else setActiveTab(!SIGNIN);
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      dispatch(fetechedUser());
    }
  }, []);
  return (
    <>
      <ToastMessage />
      <AuthTab
        clickTabHandler={clickTabHandler}
        activeTab={activeTab}
      />
      {activeTab ? (<SignIn />) : (<SignUp />)}
    </>
  );
};

export default Authentication;