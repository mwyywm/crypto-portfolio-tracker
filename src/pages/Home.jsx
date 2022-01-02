import React, { useEffect, useState } from "react";
import "./Home.css";
import Coinrow from "../components/Coinrow.jsx";

function Home() {
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
      <div className="content">
        <Coinrow coindata={coindata} setCoindata={setCoindata} />
      </div>
    </div>
  );
}

export default Home;
