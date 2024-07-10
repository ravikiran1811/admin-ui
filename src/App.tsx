import React, { useEffect, useState } from "react";
import "./App.css";
import SourceAndDestination from "./components/Source";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Source from "./components/Source";
import Destination from "./components/Destination";
import axios from "axios";
import DataRow from "./components/DataRow";

function App() {
  const source = [
    {
      dragId: "source-1",
      heading: "item 1",
      description: "description 1",
    },
    {
      dragId: "source-2",
      heading: "item 2",
      description: "description 2",
    },
    {
      dragId: "source-3",
      heading: "item 3",
      description: "description 3",
    },
    {
      dragId: "source-4",
      heading: "item 4",
      description: "description 4",
    },
  ];
  const destination = [
    {
      dragId: "destination-1",
      heading: "destin 1",
      description: "description 1",
    },
    {
      dragId: "destination-2",
      heading: "destin 2",
      description: "description 2",
    },
    {
      dragId: "destination-3",
      heading: "destin 3",
      description: "description 3",
    },
    {
      dragId: "destination-4",
      heading: "destin 4",
      description: "description 4",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [sourceData, setSourceData] = useState(source);
  const [destinationData, setDestinationData] = useState(destination);
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    console.log("Dragged item id:", result.draggableId);

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.droppableId === "sourceItems"
    ) {
      const items = Array.from(sourceData);
      const [reordered] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reordered);
      setSourceData(items);
    } else if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.droppableId === "destinationItems"
    ) {
      const items = Array.from(destinationData);
      const [reordered] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reordered);
      setDestinationData(items);
    } else if (
      result.source.droppableId === "destinationItems" &&
      result.destination.droppableId === "sourceItems"
    ) {
      const sourceItems = Array.from(sourceData);
      const destinationItems = Array.from(destinationData);
      const [reordered] = destinationItems.splice(result.source.index, 1);
      sourceItems.splice(result.destination.index, 0, reordered);
      setSourceData(sourceItems);
      setDestinationData(destinationItems);
    } else {
      const sourceItems = Array.from(sourceData);
      const destinationItems = Array.from(destinationData);
      const [reordered] = sourceItems.splice(result.source.index, 1);
      destinationItems.splice(result.destination.index, 0, reordered);
      setSourceData(sourceItems);
      setDestinationData(destinationItems);
    }
    console.log(result.source);
    console.log(result.destination);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Source initialData={sourceData} />
        <Destination data={destinationData} />
        <DataRow data={data} />
      </div>
    </DragDropContext>
  );
}

export default App;
