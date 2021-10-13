import React from 'react';

import PropTypes from 'prop-types';

import Piece from '../Piece/Piece';
import './HitPiece.scss';

const HitPiece = ({ hitPieces }) => (
  <ul className="list-group list-group-horizontal position-relative hit-piece">
    {
      hitPieces.map((piece) => (
        <li
          className="list-group-item items"
          key={`hit-${piece.name}-${piece.id}`}
        >
          <Piece
            name={piece.name}
            id={`hit-${piece.name}-${piece.id}`}
            hitStyle={{}}
          />
        </li>
      ))
    }
  </ul>
);

HitPiece.propTypes = {
  hitPieces: PropTypes.array.isRequired,
};

export default HitPiece;
