/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { BLACK, RED } from '../../utils/constants';
import { whichSide } from '../../utils/pieceMove';
import Piece from '../Piece/Piece';
import Spot from './Spot';
import './Row.scss';

const Row = ({ row, clickHandler }) => {
  const {
    playerTurn, hints, gameParams, user,
  } = useSelector(({ game, auth }) => ({
    hints: game.hints,
    gameParams: game.params,
    user: auth.user,
    playerTurn: game.params.player_turn,
  }));
  const disable = ![gameParams.player_1.user.username, gameParams.player_2.user.username]
    .includes(user.username);
  const canMove = (pieceName) => !(whichSide(pieceName) === (gameParams.side === 'Red' ? RED : BLACK));
  const haveTurn = (turn) => (turn === user.pk);
  return (
    row.map((cell, cellIndex) => (
      <td key={`tr-${cellIndex}`} id={`droppable-${cell.id}`}>
        <Droppable
          droppableId={`droppable-${cell.id}`}
          key={cell.id}
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable"
            >
              {
                cell.piece
                  ? (
                    <Draggable
                      isDragDisabled={canMove(cell.piece.name) || !haveTurn(playerTurn)
                        || disable || gameParams.connected_player < 2 || !gameParams.is_active}
                      draggableId={`${cell.piece.name}-${cell.piece.id}`}
                      index={cell.piece.id}
                      key={cell.piece.id}
                      id={`${cell.piece.name}-${cell.piece.id}`}
                      className="cell"
                    >
                      {(provid) => (
                        <div
                          ref={provid.innerRef}
                          {...provid.draggableProps}
                          {...provid.dragHandleProps}
                          onClick={() => {
                            // eslint-disable-next-line no-unused-expressions
                            !disable
                            && clickHandler(cell.piece.name, cell.id);
                          }}
                          // onMouseOver={() => {
                          //   clickHandler(cell.piece.id, cell.piece.name, cell.id);
                          // }}
                          // eslint-disable-next-line max-len
                          // onFocus={() => { clickHandler(cell.piece.id, cell.piece.name, cell.id); }}
                        >
                          <Piece
                            name={cell.piece.name}
                            id={`${cell.piece.name}-${cell.piece.id}`}
                            hitStyle={hints.includes(cell.id)
                              ? { border: '2px solid red', borderRadius: '15px' } : {}}
                          />
                        </div>
                      )}
                    </Draggable>
                  ) : (
                    <Spot
                      // visiblity={hints.includes(cell.id) && !disable ? 'visible' : 'hidden'}
                      visiblity="visible"
                      id={`spot-${cell.id}`}
                    />
                  )
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </td>
    ))
  );
};

export default Row;
