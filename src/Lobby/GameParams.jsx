/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import Field from './Field';
import {
  MOVE_TIMER, GAME_TIMER, SIDE,
} from '../utils/constants';
import './GameParams.scss';
import { PARAMETERS } from '../utils/paramsData';

const GameParams = ({ setOverlayDiv }) => {
  const [gameParams, setGameParams] = useState({
    gameType: '',
    gameRated: '',
    gameTimed: '',
    moveTime: 1,
    gameTimer: '',
    side: '',
    challenge: false,
    username: '',
  });
  const {
    gameTimed,
    challenge,
    moveTime,
  } = gameParams;
  const handleChange = ({ target: { name, value } }) => {
    setGameParams({
      ...gameParams,
      [name]: value,
    });
  };
  const handleCheckbox = ({ target: { name, checked } }) => {
    setGameParams({
      ...gameParams,
      [name]: checked,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setGameParams({
      gameType: '',
      gameRatd: '',
      gameTime: '',
      moveTimer: '',
      gameTimer: '',
      side: '',
      challenge: false,
      username: '',
    });
  };
  return (
    <div className="position-absolute w-100 h-100 overlay-div">
      <div className="position-absolute bg-white pt-4 game-params">
        <h2 className="text-center mb-3">Create game</h2>
        <i className="fas fa-times" onClick={() => { setOverlayDiv(false); }} />
        <Form onSubmit={handleSubmit} className="form-scroll">
          {
            PARAMETERS.map(({
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
              challenge
                ? (
                  <Form.Group className="m-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Search By Username" />
                  </Form.Group>
                ) : ''
            }
          </div>
          <Link to="/game/12345">
            <Button
              className="position-relative m-3 form-button"
              type="submit"
            >
              Create Game
            </Button>
          </Link>

        </Form>
      </div>
    </div>
  );
};

GameParams.propTypes = {
  setOverlayDiv: PropTypes.func.isRequired,
};

export default GameParams;
