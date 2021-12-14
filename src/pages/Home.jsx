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
    <div className="home">
      <h1>hello</h1>
      <p>paragraph</p>
      <p>We will also need a navbar 😀</p>
      <div className="content">
        <table>
          <thead>
            <tr className="coinrow">
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <Coinrow data={coindata} />
        </table>
      </div>
    </div>
  );
}

export default App;
