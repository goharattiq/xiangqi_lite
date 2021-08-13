/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './Board.scss';
import { pieceMove } from '../../redux/game/actions';

const Board = () => {
  const { board } = useSelector(({ game }) => ({ board: game.board }));
  const dispatch = useDispatch();
  const onDragEnd = (move) => {
    dispatch(pieceMove(move));
    // console.log(movesss);
  };
  return (
    <table className="col-8 border border-primary">
      <tbody>
        <DragDropContext
          onDragEnd={(move) => onDragEnd(move)}
        >
          {board.map((row, rowIndex) => (
            <tr
              key={rowIndex}
            >
              {
                row.map((cell) => (
                  <td>
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
