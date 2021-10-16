import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Button, CloseButton, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetechSearchUserNames } from '../../redux/game/thunk';
import { isValidGameParams } from '../../redux/game/utilis';
import { setToast } from '../../redux/toast/actions';
import { socketSetGameParams } from '../../socketio/gameSocketio';
import { MOVE_TIMER, GAME_TIMER, SIDE } from '../../utilis/constants';
import { GAME_PARAMETERS } from '../../utilis/paramsData';
import Field from './Field';
import './styles/GameParams.scss';

let searchTimeOut;
const GameParams = ({ setOverlayDiv }) => {
  const dispatch = useDispatch();
  const { searchNames, owner } = useSelector(({ game, auth }) => ({
    searchNames: game.searchNames,
    owner: auth.user.username,
  }));
  const [gameParams, setGameParams] = useState({
    gameType: 'Public',
    gameRated: 'Rated',
    gameTimed: 'Timed',
    moveTime: 1,
    gameTimer: 5,
    side: 'Random',
    challenge: false,
    username: '',
  });
  const {
    challenge,
    gameTimed,
    moveTime,
    username,
    gameType,
    gameRated,
    gameTimer,
    side,
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
        dispatch(setToast('You cannot play with yourself', 'danger'));
        return;
      }
      socketSetGameParams(gameParams, owner);
    } else {
      dispatch(setToast('Please choose complete game params', 'danger'));
    }
  };
  const selectedValue = [gameType, gameRated, gameTimed];
  return (
    <div className="position-absolute w-100 h-100 top-0 overlay-div">
      <div className="position-relative bg-white pt-4 start-50 game-params">
        <h2 className="text-center mb-3">Create game</h2>
        <CloseButton
          className="close-button"
          onClick={() => {
            setOverlayDiv(false);
          }}
        />
        <Form onSubmit={handleSubmit} className="form-scroll">
          {
            GAME_PARAMETERS.map(({
              data, name, type, id, className,
            }, index) => (
              <div className="d-flex justify-content-center radio-div" key={name}>
                <Field
                  data={data}
                  name={name}
                  type={type}
                  id={id}
                  className={className}
                  handleChange={handleChange}
                  check={selectedValue[index]}
                />
              </div>
            ))
          }
          {
            gameTimed === 'Timed'
              && (
                <>
                  <h5 className="text-center">Move Timer (Minutes)</h5>
                  <div className="d-flex justify-content-center radio-div">
                    <Field
                      data={MOVE_TIMER}
                      name="moveTime"
                      type="radio"
                      id="move-time"
                      className="time"
                      handleChange={handleChange}
                      check={String(moveTime)}
                    />
                  </div>
                  <h5 className="text-center">Game Timer (Minutes)</h5>
                  <div className="d-flex justify-content-center radio-div">
                    <Field
                      data={GAME_TIMER[moveTime]}
                      name="gameTimer"
                      type="radio"
                      id="game-timer"
                      className="time"
                      handleChange={handleChange}
                      check={String(gameTimer)}
                    />
                  </div>
                </>
              )
          }
          <h5 className="text-center">Side</h5>
          <div className="d-flex justify-content-center radio-div">
            <Field
              data={SIDE}
              name="side"
              type="radio"
              id="side"
              className="text-center radio-buttons"
              handleChange={handleChange}
              check={side}
            />
          </div>
          <div>
            <Form.Check
              name="challenge"
              type="checkbox"
              id="challenge"
              label="Challenge Someone?"
              className="d-flex justify-content-center"
              onChange={handleCheckbox}
            />
            {
              challenge && (
                <Form.Group className="m-3">
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
            }
            <datalist id="search-names">
              {
                searchNames.length
                  && searchNames.map((user) => (
                    <option key={user.id} value={user.username} label={user.username} />
                  ))
              }
            </datalist>
          </div>
          <Button
            className="position-relative start-50 my-3 form-button"
            type="submit"
            disabled={!isValidGameParams(gameParams, searchNames)}
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
