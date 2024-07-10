import React from "react";
import SingleCard from "../SingleCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./index.module.css";

interface ListProps {
  heading: string;
  description: string;
  dragId: string;
}

interface ListDataProps {
  data: ListProps[];
}

const List: React.FC<ListDataProps> = ({ data }) => {
  return (
    <div>
      <Droppable droppableId="list">
        {(provided) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data.map((item, index) => (
              <SingleCard
                dragId={item.dragId}
                key={`card-${index}`}
                index={index}
                heading={item.heading}
                description={item.description}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
