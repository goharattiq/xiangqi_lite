import { useJwt } from 'react-jwt';

export const loadUser = () => {
  const tokken = useJwt(localStorage.getItem('access_token'));
  // eslint-disable-next-line no-console
  console.log(tokken);
};
