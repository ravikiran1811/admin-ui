import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.css";

interface SingleCardProps {
  heading: string;
  description: string;
  index: number;
  dragId: string;
}

const SingleCard: React.FC<SingleCardProps> = ({
  heading,
  description,
  index,
  dragId,
}) => {
  return (
    <Draggable draggableId={dragId} index={index}>
      {(provided) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{heading}</h3>
          <p>{description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default SingleCard;
