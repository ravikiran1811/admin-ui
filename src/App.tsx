import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DataRow from "./components/DataRow";

function App() {
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
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="App">
      {data.length > 0 ? <DataRow data={data} /> : <h1>Loading...</h1>}
    </div>
  );
}

export default App;
