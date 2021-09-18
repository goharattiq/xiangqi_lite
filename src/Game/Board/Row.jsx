/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  const disable = ![
    gameParams.player_1.profile.user.username,
    gameParams.player_2.profile.user.username]
    .includes(user.username);
  // const canMove = (pieceName) => !(whichSide(pieceName) === (gameParams.player_1.side === 'Red' ? RED : BLACK));

  const canMove = (pieceName,playerTurn) =>  { 
    if (playerTurn === gameParams.player_1.profile.user.pk)
      return !(whichSide(pieceName) === (gameParams.player_1.side === 'Red' ? RED : BLACK));
    if (playerTurn === gameParams.player_2.profile.user.pk)
      return !(whichSide(pieceName) === (gameParams.player_2.side === 'Red' ? RED : BLACK));
  }

  const haveTurn = (turn) => (turn === user.pk);
  const bothConnected = (player_1,player_2)=> (player_1.is_connected && player_2.is_connected)
  return (
    row.map((cell) => (
      <td key={`td-${cell.id}`} id={`droppable-${cell.id}`}>
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
                      isDragDisabled={canMove(cell.piece.name,playerTurn) || !haveTurn(playerTurn)
                        || disable || !bothConnected(gameParams.player_1,gameParams.player_2) || !gameParams.is_active}
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
                            !disable && clickHandler(cell.piece.name, cell.id);
                          }}
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
                      visiblity={hints.includes(cell.id) && !disable ? 'visible' : 'hidden'}
                      // visiblity="visible"
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
