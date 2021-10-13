import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { clearHintMove, pieceMove } from '../../../redux/game/actions';
import './styles/Spot.scss';

const Spot = ({ visiblity, id, selectedPiece }) => {
  const disptach = useDispatch();
  const moveByClick = (event) => {
    const move = {
      draggableId: `${selectedPiece.pieceName}-${selectedPiece.pieceId}`,
      source: {
        droppableId: `droppableId-${selectedPiece.location}`,
      },
      destination: {
        droppableId: `droppableId-${event.target.id.split('-')[1]}`,
      },
    };
    disptach(pieceMove(move, false, null, null, null));
    disptach(clearHintMove());
  };
  return (
    <div
      id={id}
      className="spot"
      style={{ visibility: visiblity }}
      onClick={moveByClick}
    />
  );
};

Spot.propTypes = {
  visiblity: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  selectedPiece: PropTypes.object.isRequired,
};

export default Spot;
