import React from 'react';

import PropTypes from 'prop-types';

import { PIECE_MAP, RED } from '../../utilis/constants';
import { whichSide } from '../../utilis/pieceMove';
import {
  red, black, Advisor, Cannon, Chariot, Elephant, Horse, King, Pawn,
} from './PiecesImport';
import './Piece.scss';

const Piece = ({
  name, id, hitStyle,
}) => {
  const selectPiece = {
    p: <Pawn className="piece-svg" />,
    r: <Chariot className="piece-svg" />,
    h: <Horse className="piece-svg" />,
    e: <Elephant className="piece-svg" />,
    a: <Advisor className="piece-svg" />,
    k: <King className="piece-svg" />,
    c: <Cannon className="piece-svg" />,
  };
  return (
    <div
      className="piece"
      id={id}
      style={hitStyle}
    >
      <img src={whichSide(name) === RED ? red : black} alt="Piece Background" />
      {selectPiece[name.toLowerCase()]}
      <span className="piece-name">{PIECE_MAP[name.toLowerCase()]}</span>
    </div>
  );
};

Piece.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  hitStyle: PropTypes.object.isRequired,
};

export default Piece;
