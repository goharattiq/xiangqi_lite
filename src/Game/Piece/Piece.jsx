/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// import {
//   black, red, advisor, cannon, chariot, elephant, horse, king, pawn,
// } from './PiecesImport';
import black from '../../static/img/black.png';
import red from '../../static/img/red.png';
import { ReactComponent as Advisor } from '../../static/img/advisor.svg';
import { ReactComponent as Cannon } from '../../static/img/cannon.svg';
import { ReactComponent as Chariot } from '../../static/img/chariot.svg';
import { ReactComponent as Elephant } from '../../static/img/elephant.svg';
import { ReactComponent as Horse } from '../../static/img/horse.svg';
import { ReactComponent as King } from '../../static/img/king.svg';
import { ReactComponent as Pawn } from '../../static/img/pawn.svg';
import './Piece.scss';

const Piece = ({ name }) => {
  const isCapital = (str) => /[A-Z]/.test(str.at(0));
  const selectPiece = (piece) => {
    switch (piece.toLowerCase()) {
      case 'a':
        return <Advisor />;
      case 'c':
        return <Cannon />;
      case 'r':
        return <Chariot />;
      case 'e':
        return <Elephant />;
      case 'h':
        return <Horse />;
      case 'k':
        return <King />;
      case 'p':
        return <Pawn />;
      default:
        return null;
    }
  };
  return (
    <div className="piece">
      <img src={isCapital(name) ? red : black} alt="Piece Background" />
      {selectPiece(name)}
    </div>
  );
};

Piece.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Piece;
