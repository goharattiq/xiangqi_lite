/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Row = ({ row }) => (

  row.map((cell, cellIndex) => (
    <td key={`tr-${cellIndex}`} className="border border-primary">
      <Droppable droppableId={`droppable-${cell.id}`} key={cell.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="droppable"
          >
            {
                cell.item
                  ? (
                    <Draggable
                      draggableId={`dragable-${cell.id}`}
                      index={cell.id}
                      key={cell.id}
                    >
                      {(provid) => (
                        <div
                          ref={provid.innerRef}
                          {...provid.draggableProps}
                          {...provid.dragHandleProps}
                          className="drag-div"
                        />
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
