/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Field from './Field';
import './GameParams.scss';

const GameParams = () => {
  const GAME_TYPES = ['Public', 'Private'];
  const GAME_RATED = ['Rated', 'Unrated'];
  const GAME_TIMED = ['Timed', 'Nontimed'];
  const MOVE_TIMER = ['1', '2', '5', '10'];
  const GAME_TIMER = ['5', '10', '20', '30', '60'];
  const SIDE = ['RED', 'RANDOM', 'BLACK'];
  const [gameParams, setGameParams] = useState({
    gameType: '',
    gameRated: '',
    gameTimed: '',
    moveTime: '',
    gameTimer: '',
    side: '',
    challenge: false,
    username: '',
  });
  const {
    gameTimed,
    challenge,
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
      <div className="position-absolute bg-white w-25 pt-4 game-params">
        <h2 className="text-center">Create game</h2>
        <i className="fas fa-times" />
        <Form onSubmit={handleSubmit}>
          <div className="d-flex ms-5">
            <Field
              data={GAME_TYPES}
              name="gameType"
              type="radio"
              id="game-type"
              className="text-center radio-buttons"
              handleChange={handleChange}
            />
          </div>
          <div className="d-flex ms-5">
            <Field
              data={GAME_RATED}
              name="gameRated"
              type="radio"
              id="game-rate"
              className="text-center radio-buttons"
              handleChange={handleChange}
            />
          </div>
          <div className="d-flex ms-5">
            <Field
              data={GAME_TIMED}
              name="gameTimed"
              type="radio"
              id="game-timed"
              className="text-center radio-buttons"
              handleChange={handleChange}
            />
          </div>
          {
            gameTimed === 'Timed'
              ? (
                <>
                  <h5 className="text-center">Move Timer (Minutes)</h5>
                  <div className="d-flex ms-5">
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
                  <div className="d-flex ms-5">
                    <Field
                      data={GAME_TIMER}
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
          <div className="d-flex ms-3">
            <Field
              data={SIDE}
              name="side"
              type="radio"
              id="side"
              className="text-center radio-buttons"
              handleChange={handleChange}
            />
          </div>
          <div className="ms-5">
            <Form.Check
              name="challenge"
              type="checkbox"
              id="challenge"
              label="Cahllenge Someone?"
              onChange={handleCheckbox}
            />
            {
              challenge
                ? (
                  <Form.Group className="m-3 me-5" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Search By Username" />
                  </Form.Group>
                ) : ''
            }
          </div>
          <Button
            className="position-relative form-button"
            type="submit"
          >
            Create Game
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default GameParams;
