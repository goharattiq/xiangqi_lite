/* eslint-disable react/forbid-prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Piece from '../Piece/Piece';

const HitPiece = ({ hitPieces }) => (
  <>
    {
      hitPieces.map((piece) => (
        <Piece
          name={piece.name}
          id={`hit-${piece.name}-${piece.id}`}
          key={`hit-${piece.name}-${piece.id}`}
          hitStyle={{}}
        />
      ))
    }
  </>
);

HitPiece.propTypes = {
  hitPieces: PropTypes.array.isRequired,
};

export default HitPiece;
