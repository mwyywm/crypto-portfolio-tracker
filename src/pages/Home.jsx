import React, { useEffect, useState } from "react";
import "./Home.css";
import Coinrow from "../components/Coinrow.jsx";

function App() {
  const [coindata, setCoindata] = useState([]);
  useEffect(() => {
    //fetch data from temporary_data.json
    fetch("temporary_data.json")
      .then((res) => res.json())
      .then((data) => setCoindata(data));
    console.log(coindata);
  }, []);

  return (
    <div className="Home">
      <h1> Hello World!</h1>
      <table>
        <Coinrow data={coindata} />
      </table>
    </div>
  );
}

export default App;
