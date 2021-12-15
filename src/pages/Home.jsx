import React, { useEffect, useState } from "react";
import "./Home.css";
import Coinrow from "../components/Coinrow.jsx";

function App() {
  const [coindata, setCoindata] = useState([]);
  useEffect(() => {
    //fetch data from temporary_data.json
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCoindata(data));
  }, []);

  return (
    <div className="home">
      <h1>hello</h1>
      <p>paragraph</p>
      <p>We will also need a navbar 😀</p>
      <div className="content">
        <Coinrow coindata={coindata} setCoindata={setCoindata} />
      </div>
    </div>
  );
}

export default App;
