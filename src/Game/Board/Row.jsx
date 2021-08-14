/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Draggable, Droppable,
} from 'react-beautiful-dnd';
import Piece from '../Piece/Piece';
import './Row.scss';

const Row = ({ row }) => (
  row.map((cell, cellIndex) => (
    <td key={`tr-${cellIndex}`} className="border border-primary" id={`droppable-${cell.id}`}>
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
                      draggableId={`dragable-${cell.piece.id}`}
                      index={cell.piece.id}
                      key={cell.piece.id}
                      id={cell.piece.id}
                    >
                      {(provid) => (
                        <div
                          ref={provid.innerRef}
                          {...provid.draggableProps}
                          {...provid.dragHandleProps}
                        >
                          <Piece name={cell.piece.name} />
                        </div>
                      )}
                    </Draggable>
                  ) : ''
              }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </td>
  ))
);

export default Row;
