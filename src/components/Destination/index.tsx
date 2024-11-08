import React from "react";
import SingleCard from "../SingleCard";
import { Droppable } from "react-beautiful-dnd";
import styles from "./index.module.css";
import DoubleWidthCard from "../DoubleWidthCard";
interface CardProps {
  heading: string;
  description: string;
  dragId: string;
  width?: string;
}
interface DestinationProps {
  data: CardProps[];
}
const Destination: React.FC<DestinationProps> = ({ data }) => {
  return (
    <Droppable droppableId="destinationItems" direction="horizontal">
      {(provided) => (
        <div
          className={styles.destination}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {data.map((card, index) => (
            <DoubleWidthCard
              dragId={card.dragId}
              key={card.dragId}
              heading={card.heading}
              description={card.description}
              index={index}
              width={card.width}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Destination;
