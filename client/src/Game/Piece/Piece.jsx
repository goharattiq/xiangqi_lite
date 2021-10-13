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
  const pieceMap = {
    p: Pawn,
    r: Chariot,
    h: Horse,
    e: Elephant,
    a: Advisor,
    k: King,
    c: Cannon,
  };
  const key = name.toLowerCase();
  const SelectedPiece = pieceMap[key];
  return (
    <div
      className="piece"
      id={id}
      style={hitStyle}
    >
      <img src={whichSide(name) === RED ? red : black} alt="Piece Background" />
      <SelectedPiece className="piece-svg" />
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
