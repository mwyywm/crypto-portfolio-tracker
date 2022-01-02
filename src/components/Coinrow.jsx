import React, { useEffect, useState } from "react";
import "./coinrow.css";
import { Link } from "react-router-dom";

function CoinRow({ coindata, setCoindata }) {
  const [sort, setSort] = useState("market_cap_desc");
  // market_cap_desc, market_cap_asc, price_desc, price_asc, Alphabetical a-z, Alphabetical z-a

  // create a function that adds comma and dot to the number and returns it
  const addComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // !TODO: Fix the sorting. It is not working properly at the moment...
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
    coindata.length > 0 && (
      <table>
        <thead>
          <tr className="headerrow">
            {/*when <th> is clicked, the sort function will be called and the data will be sorted*/}
            <th onClick={() => setSort("market_cap_asc")}>#</th>
            <th onClick={() => setSort("Alphabetical a-z")}>Coin</th>
            <th onClick={() => setSort("price_desc")}>Price</th>
            <th>Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody className="coinbody">
          {coindata &&
            coindata.map((coin) => (
              <tr className="cointr" key={coin.name}>
                <td>{coin.market_cap_rank}</td>
                <Link to={coin.id}>
                  <td>{coin.name}</td>{" "}
                </Link>
                {/*!TODO: Add a link to the coin page link should <Link> to "/coin.name" */}
                <td>{coin.current_price}</td>
                <td>{coin.price_change_percentage_24h}</td>
                <td>{addComma(coin.market_cap)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  );
}

export default CoinRow;
