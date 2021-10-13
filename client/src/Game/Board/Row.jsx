import React from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { whichSide } from '../../utilis/pieceMove';
import Spot from '../Components/Spot';
import { Piece } from '../Piece';
import './Row.scss';

const Row = ({
  row, clickHandler, selectedPiece,
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
      return !(whichSide(pieceName) === gameParams.player_1.side);
    }
    if (turn === gameParams.player_2.profile.user.pk) {
      return !(whichSide(pieceName) === gameParams.player_2.side);
    }
    return false;
  };

  const haveTurn = (turn) => (turn === user.pk);
  const bothConnected = (playerOne, playerTwo) => (playerOne && playerTwo)
    && (playerOne.is_connected && playerTwo.is_connected);

  const getCoords = (str) => {
    const newStr = str.slice(10, str.length - 1);
    return newStr.split(',');
  };
  const getStyle = (style, snapshot) => {
    const x = `${-50}%`;
    const y = `${8.4}rem`;
    let coords;
    if (!snapshot.isDropAnimating) {
      if (!style.transform) {
        return style;
      }
      coords = getCoords(style.transform);
      const calcX = `calc(${coords[0]} - ${x})`;
      const calcY = `calc(${coords[1].trim()} - ${y})`;
      return {
        ...style,
        left: '50%',
        transform: `translate(${calcX}, ${calcY})`,
      };
    }
    const { moveTo } = snapshot.dropAnimation;
    const moveCalcX = `calc(${moveTo.x}px - ${x})`;
    const moveCalcY = `calc(${moveTo.y}px - ${y})`;
    const translate = `translate(${moveCalcX}, ${moveCalcY})`;
    return {
      ...style,
      left: '50%',
      transform: `${translate}`,
    };
  };
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
              className="droppable w-100 h-100"
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
                    >
                      {(provid, snapshot) => (
                        <div
                          ref={provid.innerRef}
                          {...provid.draggableProps}
                          {...provid.dragHandleProps}
                          onClick={() => {
                            !disable
                              && !canMove(cell.piece.name, playerTurn)
                              && haveTurn(playerTurn)
                              && clickHandler(cell.piece.name, cell.id, cell.piece.id);
                          }}
                          style={getStyle(provid.draggableProps.style, snapshot)}
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
