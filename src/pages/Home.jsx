import React, { useState } from "react";
import "./Home.css";
import Coinrow from "../components/Coinrow.jsx";

function App() {
  const [sort, setSort] = useState("");
  // market_cap_desc, market_cap_asc, price_desc, price_asc, Alphabetical a-z, Alphabetical z-a

  return (
    <div className="home">
      <h1>hello</h1>
      <p>paragraph</p>
      <p>We will also need a navbar 😀</p>
      <div className="content">
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
          <Coinrow sort={sort} />
        </table>
      </div>
    </div>
  );
}

export default App;
