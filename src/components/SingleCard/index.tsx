import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.css";

interface SingleCardProps {
  heading: string;
  description: string;
  index: number;
  dragId: string;
  width?: string;
}

const SingleCard: React.FC<SingleCardProps> = ({
  heading,
  description,
  index,
  dragId,
  width,
}) => {
  return (
    <Draggable draggableId={dragId} index={index}>
      {(provided, snapshot) => (
        <div
          className={
            width === "200px" ? styles.container : styles.widthContainer
          }
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
