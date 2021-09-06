/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { MAP } from '../../utils/constants';
import { whichSide } from '../../utils/pieceMove';
import {
  red, black, Advisor, Cannon, Chariot, Elephant, Horse, King, Pawn,
} from './PiecesImport';
import './Piece.scss';

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
      <img src={whichSide(name) ? red : black} alt="Piece Background" />
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
