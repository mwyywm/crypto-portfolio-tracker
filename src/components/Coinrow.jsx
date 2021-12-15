import React, { useEffect, useState } from "react";
import "./coinrow.css";

function CoinRow({ sort }) {
  const [coindata, setCoindata] = useState([]);
  // take data from JSON file and put it into an array

  useEffect(() => {
    //fetch data from temporary_data.json
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCoindata(data));
  }, []);

  // create a function that adds comma and dot to the number and returns it
  const addComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sortData = (sort) => {
    if (sort === "market_cap_desc") {
      return coindata.sort((a, b) => b.market_cap - a.market_cap);
    } else if (sort === "market_cap_asc") {
      return coindata.sort((a, b) => a.market_cap - b.market_cap);
    } else if (sort === "price_desc") {
      return coindata.sort((a, b) => b.current_price - a.current_price);
    } else if (sort === "price_asc") {
      return coindata.sort((a, b) => a.current_price - b.current_price);
    } else if (sort === "Alphabetical a-z") {
      return coindata.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Alphabetical z-a") {
      return coindata.sort((a, b) => b.name.localeCompare(a.name));
    }
  };

  useEffect(() => {
    setCoindata(sortData(sort));
  }, [sort]);
  return (
    <>
      <tbody className="coinbody">
        {coindata &&
          coindata.map((coin) => (
            <tr className="cointr" key={coin.name}>
              <td>{coin.market_cap_rank}</td>
              <td>{coin.name}</td>
              <td>{coin.current_price}</td>
              <td>{coin.price_change_percentage_24h}</td>
              <td>{addComma(coin.market_cap)}</td>
            </tr>
          ))}
      </tbody>
    </>
  );
}

export default CoinRow;
