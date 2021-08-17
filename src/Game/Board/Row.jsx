/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Draggable, Droppable,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import Piece from '../Piece/Piece';
import './Row.scss';
import Spot from './Spot';

const Row = ({ row, clickHandler }) => {
  // eslint-disable-next-line no-unused-vars
  const hints = useSelector(({ game }) => (game.hints));
  return (
    row.map((cell, cellIndex) => (
      <td key={`tr-${cellIndex}`} id={`droppable-${cell.id}`}>
        <Droppable droppableId={`droppable-${cell.id}`} key={cell.id}>
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
                          onClick={() => { clickHandler(cell.piece.name, cell.id); }}
                        >
                          <Piece name={cell.piece.name} id={`${cell.piece.name}-${cell.piece.id}`} />
                        </div>
                      )}
                    </Draggable>
                  ) : <Spot visiblity={hints.includes(cell.id) ? 'visible' : 'hidden'} id={`spot-${cell.id}`} />
                  // ) : <Spot visiblity="vissible" id={`spot-${cell.id}`} />
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
