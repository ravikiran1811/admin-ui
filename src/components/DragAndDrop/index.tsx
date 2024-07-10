import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DragAndDrop: React.FC = () => {
  const data = ["Item 1", "Item 2", "Item 3"];

  return (
    <div>
      <h1>header</h1>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="cards">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((item, index) => (
                <Draggable draggableId={item} index={index} key={item}>
                  {(provided) => (
                    <li
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      key={index}
                    >
                      {item}
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragAndDrop;
