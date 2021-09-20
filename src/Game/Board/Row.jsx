/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { BLACK, RED } from '../../utils/constants';
import { whichSide } from '../../utils/pieceMove';
import Spot from '../Components/Spot';
import Piece from '../Piece/Piece';
import './Row.scss';

const Row = ({
  row, clickHandler, isRotate, selectedPiece,
}) => {
  const {
    playerTurn, hints, gameParams, user,
  } = useSelector(({ game, auth }) => ({
    hints: game.hints,
    gameParams: game.params,
    user: auth.user,
    playerTurn: game.params.player_turn,
  }));
  const disable = gameParams.player_2 && ![
    gameParams.player_1.profile.user.username,
    gameParams.player_2.profile.user.username]
    .includes(user.username);

  const canMove = (pieceName, turn) => {
    if (turn === gameParams.player_1.profile.user.pk) {
      return !(whichSide(pieceName) === (gameParams.player_1.side === 'Red' ? RED : BLACK));
    }
    if (turn === gameParams.player_2.profile.user.pk) {
      return !(whichSide(pieceName) === (gameParams.player_2.side === 'Red' ? RED : BLACK));
    }
    return false;
  };
  const getCoords = (prop) => {
    let str = prop;
    if (typeof (str) === 'string') {
      str = str.slice(9);
      str = str.substring(1, str.length - 1);
      str = str.split(',');
      return [-1 * parseInt(str[0], 10), -1 * parseInt(str[1], 10)];
    }
    return null;
  };
  const getStyle = (style, snapshot, isRotated) => {
    const coords = getCoords(style.transform);
    if (!coords) { return style; }

    if (!snapshot.isDropAnimating) {
      if (!style.transform) {
        return style;
      }
      return isRotated ? {
        ...style,
        left: 0,
        top: 0,
        transform: `translate(${coords[0]}px, ${coords[1]}px)`,
      } : style;
    }
    return isRotated ? {
      ...style,
      left: 0,
      top: 0,
      transform: `translate(${coords[0]}px, ${coords[1]}px)`,
    } : style;
  };

  const haveTurn = (turn) => (turn === user.pk);
  const bothConnected = (playerOne, playerTwo) => (playerOne && playerTwo)
    && (playerOne.is_connected && playerTwo.is_connected);
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
                      isDragDisabled={canMove(cell.piece.name, playerTurn) || !haveTurn(playerTurn)
                        || disable || !bothConnected(gameParams.player_1, gameParams.player_2)
                        || !gameParams.is_active}
                      draggableId={`${cell.piece.name}-${cell.piece.id}`}
                      index={cell.piece.id}
                      key={cell.piece.id}
                      id={`${cell.piece.name}-${cell.piece.id}`}
                      className="cell"
                    >
                      {(provid, snapshot) => (
                        <div
                          ref={provid.innerRef}
                          {...provid.draggableProps}
                          {...provid.dragHandleProps}
                          style={getStyle(provid.draggableProps.style, snapshot, isRotate)}
                          onClick={() => {
                            !disable
                              && !canMove(cell.piece.name, playerTurn)
                              && haveTurn(playerTurn)
                              && clickHandler(cell.piece.name, cell.id, cell.piece.id);
                          }}
                        >
                          <Piece
                            name={cell.piece.name}
                            id={`${cell.piece.name}-${cell.piece.id}`}
                            hitStyle={hints.includes(cell.id)
                              ? { border: '2px solid red', borderRadius: '15px' } : {}}
                            rotateStyle={isRotate ? { transform: 'rotate(180deg)' } : {}}
                          />
                        </div>
                      )}
                    </Draggable>
                  ) : (
                    <Spot
                      visiblity={hints.includes(cell.id) && !disable ? 'visible' : 'hidden'}
                      // visiblity="visible"
                      id={`spot-${cell.id}`}
                      selectedPiece={selectedPiece}
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
