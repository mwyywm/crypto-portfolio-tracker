import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./Coin.css";

function Coin() {
  let params = useParams();
  const [coin, setCoin] = useState({});
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${params.coin}`) // fetching the current URL parameter
      .then((res) => res.json())
      .then((data) => setCoin(data));
    console.log(coin);
  }, []);
  return (
    <section>
      <div className="coin">
        <Link to="/">
          <button>Go back!</button>
        </Link>
        {coin.name && (
          <>
            <h1>{coin.name}</h1>
            <p>
              <b>{coin.symbol.toUpperCase()}</b>
            </p>
            <img src={coin.image.small} alt={coin.name} />
          </>
        )}
      </div>
    </section>
  );
}

export default Coin;
