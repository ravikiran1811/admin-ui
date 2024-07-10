import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";

interface Card {
  id: string;
  content: string;
}

const initialCards: Card[] = [
  { id: "card-1", content: "Card 1" },
  { id: "card-2", content: "Card 2" },
  { id: "card-3", content: "Card 3" },
  // Add more cards as needed
];

const DraggableCardsList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const onDragStart = (start: any) => {
    const draggableId = start.draggableId;
    console.log("Draggable ID:", draggableId);
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result, "result");

    if (!result.destination) return;

    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCards(items);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="cards">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Draggable draggableId={card.id} index={index} key={card.id}>
                {(provided: DraggableProvided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    style={{
                      userSelect: "none",
                      padding: 16,
                      margin: "0 0 8px 0",
                      minHeight: "50px",
                      backgroundColor: "#fff",
                      color: "#333",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {card.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableCardsList;
