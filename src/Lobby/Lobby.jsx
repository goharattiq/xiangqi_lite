import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import GameParams from './GameParams';
import { gameParamsAct } from '../redux/game/actions';
import { socketEnterGame, useSockets } from '../scoketio/socketio';
import './Lobby.scss';

const Lobby = () => {
  document.body.style.backgroundColor = '#ede8e0';
  const [overlayDiv, setOverlayDiv] = useState(false);
  const { user, accessToken } = useSelector(({ auth }) => (
    { user: auth.user, accessToken: auth.access_token }));
  const dispatch = useDispatch();

  const setGameParams = (params) => {
    dispatch(gameParamsAct(params));
  };
  const history = useHistory();
  useEffect(() => {
    // const disconnectSocket = useSockets(SOCKET_URL, 'opop', setGameParams);
    useSockets(
      accessToken, setGameParams, history, user.username, dispatch,
    );
    // return () => {
    //   disconnectSocket();
    // };
  }, [useSockets]);

  const [gameId, setGameID] = useState('');
  const handleChange = ({ target: { value } }) => {
    setGameID(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    socketEnterGame(gameId);
    setGameID('');
  };
  return (
    <>
      <Button className="position-absolute m-2 new-game" onClick={() => { setOverlayDiv(!overlayDiv); }}>
        <i className="fas fa-plus pe-2" />
        New Game
      </Button>
      {overlayDiv ? <GameParams setOverlayDiv={setOverlayDiv} /> : ''}

      <Form className="sign-form" onSubmit={handleSubmit}>
        <FloatingLabel
          label="game ID"
        >
          <Form.Control
            type="text"
            name="gameId"
            value={gameId}
            placeholder="Game ID"
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button
          className="form-button"
          type="submit"
        >
          Enter Game
        </Button>
      </Form>
    </>
  );
};

export default Lobby;
