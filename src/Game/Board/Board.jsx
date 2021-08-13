/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './Board.scss';

const Board = () => {
  const { board } = useSelector(({ game }) => ({ board: game.board }));
  const onDragEnd = () => { };
  // eslint-disable-next-line prefer-const
  let droppableID = 0;
  // eslint-disable-next-line prefer-const
  let dragableID = 0;
  return (
    <table className="col-8 border border-primary">
      <tbody>
        <DragDropContext
          onDragEnd={() => onDragEnd}
        >
          {board.map((row, rowIndex) => (
            <tr
              key={droppableID}
            >
              {
                row.map((cell, cellIndex) => (
                  <td>
                    <Droppable droppableId={`droppable-${rowIndex + droppableID++}`} key={droppableID}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="droppable"
                        >
                          {
                            cell !== '-'
                              ? (
                                <Draggable
                                  draggableId={`dragable-${cellIndex + dragableID++}`}
                                  index={dragableID}
                                  key={dragableID}
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
              }
              {/* <div>
                <Droppable droppableId={`droppable-${rowIndex}`} key={rowIndex}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="droppable"
                    >
                      {row.map((cell, index) => (
                        cell !== '-'
                          ? (
                            <Draggable
                              key={index}
                              draggableId={`drag-${index}`}
                              index={index}
                            >
                              {(provid) => (
                                <div
                                  ref={provid.innerRef}
                                  {...provid.draggableProps}
                                  {...provid.dragHandleProps}
                                  className="position-absolute block drag-div"
                                />
                              )}
                            </Draggable>
                          ) : ''
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div> */}
            </tr>
          ))}
        </DragDropContext>
      </tbody>
    </table>
  );
};

export default Board;
