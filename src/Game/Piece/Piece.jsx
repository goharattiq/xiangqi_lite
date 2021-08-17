/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { isCapital } from '../../pieceMoveUtils';
import {
  red, black, Advisor, Cannon, Chariot, Elephant, Horse, King, Pawn,
} from './PiecesImport';
import './Piece.scss';

const Piece = ({ name, id }) => {
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
    <div className="piece" id={id}>
      <img src={isCapital(name) ? red : black} alt="Piece Background" />
      {selectPiece(name)}
    </div>
  );
};

Piece.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Piece;
