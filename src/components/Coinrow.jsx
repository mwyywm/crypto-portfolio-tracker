import React, { useEffect } from "react";
import "./coinrow.css";

// let im = [x[0] + x[28] + x[56] + x[84] + x[112] + x[140] + x[167]];

function CoinRow({ data }) {
  return (
    <>
      <tbody className="coinbody">
        {data
          ? data.map((coin) => (
              <tr className="cointr" key={coin.name}>
                <td>{coin.market_cap_rank}</td>
                <td>{coin.name}</td>
                <td>{coin.current_price}</td>
                <td>{coin.price_change_percentage_24h}</td>
              </tr>
            ))
          : null}
      </tbody>
    </>
  );
}

export default CoinRow;
