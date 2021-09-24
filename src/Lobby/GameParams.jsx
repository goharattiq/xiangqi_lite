import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Button, CloseButton, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetechSearchUserNames } from '../redux/game/thunk';
import { isValidGameParams } from '../redux/game/utilis';
import { setToast } from '../redux/toast/actions';
import { socketSetGameParams } from '../socketio/gameSocketio';
import { MOVE_TIMER, GAME_TIMER, SIDE } from '../utilis/constants';
import { GAME_PARAMETERS } from '../utilis/paramsData';
import Field from './Field';
import './GameParams.scss';

let searchTimeOut;
const GameParams = ({ setOverlayDiv }) => {
  const dispatch = useDispatch();
  const { searchNames, owner } = useSelector(({ game, auth }) => ({
    searchNames: game.searchNames,
    owner: auth.user.username,
  }));
  const [gameParams, setGameParams] = useState({
    gameType: '',
    gameRated: '',
    gameTimed: '',
    moveTime: 1,
    gameTimer: 30,
    side: '',
    challenge: false,
    username: '',
  });
  const {
    challenge,
    gameTimed,
    moveTime,
    username,
  } = gameParams;
  const handleChange = ({ target: { name, value } }) => {
    clearTimeout(searchTimeOut);
    setGameParams({
      ...gameParams,
      [name]: value,
    });
    if (name === 'username' && value) {
      searchTimeOut = setTimeout(() => {
        dispatch(fetechSearchUserNames(value));
      }, 500);
    }
  };
  const handleCheckbox = ({ target: { name, checked } }) => {
    setGameParams({
      ...gameParams,
      [name]: checked,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidGameParams(gameParams, searchNames)) {
      if (owner === username) {
        dispatch(setToast('You cannot play with yourself', 'danger', dispatch));
        return;
      }
      socketSetGameParams(gameParams, owner);
      setGameParams({
        gameType: '',
        gameRated: '',
        gameTime: '',
        moveTime: 1,
        gameTimer: 30,
        side: '',
        username: '',
      });
    } else {
      dispatch(setToast('Please choose complete game params', 'danger', dispatch));
    }
  };
  return (
    <div className="position-absolute w-100 h-100 overlay-div">
      <div className="position-absolute bg-white pt-4 game-params">
        <h2 className="text-center mb-3">Create game</h2>
        <CloseButton
          className="close-button"
          onClick={() => { setOverlayDiv(false); }}
        />
        <Form onSubmit={handleSubmit} className="form-scroll">
          {
            GAME_PARAMETERS.map(({
              data, name, type, id, className,
            }) => (
              <div className="d-flex justify-content-center" key={name}>
                <Field
                  data={data}
                  name={name}
                  type={type}
                  id={id}
                  className={className}
                  handleChange={handleChange}
                />
              </div>
            ))
          }
          {
            gameTimed === 'Timed'
              ? (
                <>
                  <h5 className="text-center">Move Timer (Minutes)</h5>
                  <div className="d-flex justify-content-center">
                    <Field
                      data={MOVE_TIMER}
                      name="moveTime"
                      type="radio"
                      id="move-time"
                      className="time radio-buttons"
                      handleChange={handleChange}
                      checkField="move-time-1"
                    />
                  </div>
                  <h5 className="text-center">Game Timer (Minutes)</h5>
                  <div className="d-flex justify-content-center ms-3">
                    <Field
                      data={GAME_TIMER[moveTime]}
                      name="gameTimer"
                      type="radio"
                      id="game-timer"
                      className="time radio-buttons"
                      handleChange={handleChange}
                      checkField="game-timer-1"
                    />
                  </div>
                </>
              ) : ''
          }
          <h5 className="text-center">Side</h5>
          <div className="d-flex">
            <Field
              data={SIDE}
              name="side"
              type="radio"
              id="side"
              className="text-center radio-buttons"
              handleChange={handleChange}
              checkField="side-1"
            />
          </div>
          <div className="">
            <Form.Check
              name="challenge"
              type="checkbox"
              id="challenge"
              label="Cahllenge Someone?"
              className="d-flex justify-content-center"
              onChange={handleCheckbox}
            />
            {
              challenge ? (
                <Form.Group className="m-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Search By Username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    list="search-names"
                    autoComplete="off"
                  />
                </Form.Group>
              )
                : ''
            }
            <datalist id="search-names">
              {
                searchNames.length !== 0
                  ? searchNames.map((user) => (
                    <option key={user.id} value={user.username} label={user.username} />
                  ))
                  : <p>Nothing Found</p>
              }
            </datalist>
          </div>
          <Button
            className="position-relative m-3 form-button"
            type="submit"
          >
            Create Game
          </Button>
        </Form>
      </div>
    </div>
  );
};

GameParams.propTypes = {
  setOverlayDiv: PropTypes.func.isRequired,
};

export default GameParams;
