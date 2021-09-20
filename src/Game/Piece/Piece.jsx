import React from 'react';

import PropTypes from 'prop-types';

import { MAP } from '../../utils/constants';
import { whichSide } from '../../utils/pieceMove';
import {
  red, black, Advisor, Cannon, Chariot, Elephant, Horse, King, Pawn,
} from './PiecesImport';
import './Piece.scss';

const Piece = ({
  name, id, hitStyle, rotateStyle,
}) => {
  const selectPiece = (piece) => {
    switch (piece.toLowerCase()) {
      case 'a':
        return <Advisor className="piece-svg" />;
      case 'c':
        return <Cannon className="piece-svg" />;
      case 'r':
        return <Chariot className="piece-svg" />;
      case 'e':
        return <Elephant className="piece-svg" />;
      case 'h':
        return <Horse className="piece-svg" />;
      case 'k':
        return <King className="piece-svg" />;
      case 'p':
        return <Pawn className="piece-svg" />;
      default:
        return null;
    }
  };
  return (
    <div
      className="piece"
      id={id}
      style={{
        ...hitStyle,
        ...rotateStyle,
      }}
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
  rotateStyle: PropTypes.object.isRequired,
};

export default Piece;
