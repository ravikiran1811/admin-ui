import React from "react";
import SingleCard from "../SingleCard";
import { Droppable } from "react-beautiful-dnd";
import styles from "./index.module.css";

interface ListProps {
  heading: string;
  description: string;
  dragId: string;
}

interface ListDataProps {
  initialData: ListProps[];
}

const Source: React.FC<ListDataProps> = ({ initialData }) => {
  return (
    <Droppable droppableId="sourceItems">
      {(provided) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {initialData.map((item, index) => (
            <SingleCard
              key={item.dragId}
              dragId={item.dragId}
              index={index}
              heading={item.heading}
              description={item.description}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Source;
