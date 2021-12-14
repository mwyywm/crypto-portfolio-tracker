import React, { useEffect } from "react";

function CoinRow({ data }) {
  return (
    <tbody>
      {data
        ? data.map((coin) => (
            <tr>
              <td>{coin.market_cap_rank}</td>
              <td>{coin.name}</td>
              <td>{coin.current_price}</td>
              <td>{coin.price_change_percentage_24h}</td>
            </tr>
          ))
        : null}
    </tbody>
  );
}

export default CoinRow;
