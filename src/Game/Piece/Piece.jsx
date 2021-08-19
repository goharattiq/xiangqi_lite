/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { isCapital } from '../../pieceMoveUtils';
import {
  red, black, Advisor, Cannon, Chariot, Elephant, Horse, King, Pawn,
} from './PiecesImport';
import './Piece.scss';
import { MAP } from '../../utils/constants';

const Piece = ({ name, id, hitStyle }) => {
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
    <div
      className="piece"
      id={id}
      style={hitStyle}
    >
      <img src={isCapital(name) ? red : black} alt="Piece Background" />
      {selectPiece(name)}
      <span className="piece-name">{MAP[name.toLowerCase()]}</span>
    </div>
  );
};

Piece.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  hitStyle: PropTypes.object.isRequired,
};

export default Piece;
