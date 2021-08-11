/* eslint-disable import/prefer-default-export */
import { useJwt } from 'react-jwt';

export const loadUser = () => {
  const tokken = useJwt(localStorage.getItem('access_token'));
  console.log(tokken);
};
