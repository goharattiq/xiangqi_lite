/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Draggable, Droppable,
} from 'react-beautiful-dnd';
import Piece from '../Piece/Piece';
import './Row.scss';
import Spot from './Spot';

const Row = ({ row }) => (
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
                        >
                          <Piece name={cell.piece.name} id={`${cell.piece.name}-${cell.piece.id}`} />
                        </div>
                      )}
                    </Draggable>
                  ) : <Spot />
              }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </td>
  ))
);

export default Row;
