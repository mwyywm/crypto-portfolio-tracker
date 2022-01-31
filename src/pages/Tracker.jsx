import React, { useState, useEffect, useRef } from "react";
import "./tracker.css";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import axios from "axios";
import useDebounce from "../hooks/useDebounce.jsx";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import uuid from "../utils/uuid";

function Tracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 450);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [portfolio, setPortfolio] = useState([
    {
      name: "Bitcoin",
      holdings: 0,
      price: 38000,
      uuid: "eae3r9h69rqe1k5hnmxuo",
    },
    {
      name: "Ethereum",
      holdings: 2,
      price: 3400,
      uuid: "1vewwxhrfdbnrjkynoyxf",
    },
  ]); // TODO: get this from local storage.
  const ref = useRef();
  // TODO: on page load get the portfolio from local storage.
  // TODO: After we add a coin to the portfolio, we fetch the price of the coin added.
  function handleInputChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
    setShowResults(true);
    if (event.target.value.length === 0) {
      setResults([]);
    }
    if (
      event.target.value.length > 2 &&
      event.target.value.match(/^[a-zA-Z0-9]+$/)
    ) {
      setSearchTerm(event.target.value);
    }
  }
  function handleSearchClick(event) {
    event.preventDefault();
    setShowResults(true);
    // If the coin we click already exists in the portfolio, we don't want to add it again.
    if (
      [...portfolio].some(
        (coin) =>
          coin.name === event.target.alt || coin.name === event.target.innerText
      )
    ) {
      return;
    }

    if (event.target.tagName === "IMG") {
      setPortfolio([
        ...portfolio,
        { name: event.target.alt, holdings: 0, price: 0, uuid: uuid() },
      ]);
    } else if (event.target.tagName === "P") {
      setPortfolio([
        ...portfolio,
        { name: event.target.innerText, holdings: 0, price: 0, uuid: uuid() },
      ]);
    }
    setSearchTerm("");
    setResults([]);
    //console.log(portfolio);
  }
  function handleClickOutside(e) {
    // hide results div when clicking outside of search results div
    setShowResults(false);
  }
  function handleRemoveCoin(coinToRemove) {
    // remove coin from portfolio
    const newPortfolio = portfolio.filter((coin) => coin.name !== coinToRemove);
    setPortfolio(newPortfolio);
  }
  function handleHoldingsChange(event, inputCoin) {
    // update holdings for a coin
    const indexOfCoin = portfolio.findIndex((coin) => coin.name === inputCoin);
    //console.log(indexOfCoin);
    setPortfolio(
      [...portfolio],
      (portfolio[indexOfCoin].holdings = event.target.value)
    );
  }
  useEffect(() => {
    if (debouncedSearchTerm.length > 1) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/search?query=${debouncedSearchTerm}`
        )
        .then((res) => {
          setResults(res.data.coins.slice(0, 15));
        });
    } else {
    }
  }, [debouncedSearchTerm]);

  useOnClickOutside(ref, handleClickOutside);
  return (
    <section className="tracker">
      <h1>Portfolio tracker</h1>
      <p>we should be able to add/remove coins</p>
      <p>we should be able to Change value of holdings</p>
      <p>
        the information should be saved in localstorage so we can view it later
      </p>
      <div>
        <p>Add coin:</p>
        <div className="search-div">
          <SearchInput
            onInput={handleInputChange}
            value={searchTerm}
            onClick={() => setShowResults(true)}
          />
          <SearchResults
            data={results}
            onClick={handleSearchClick}
            ref={ref}
            showResults={showResults}
          />
        </div>
        <div className="portfolio">
          <p>Holdings:</p>
          {portfolio.map((coin) => (
            <div
              key={coin.uuid}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "450px",
                maxWidth: "100%",
              }}
            >
              <p>{coin.name}</p>
              {/* we want to set coin.price to xxxx*/}
              <input
                type="number"
                onChange={(event) => handleHoldingsChange(event, coin.name)}
              />
              <button>Edit holdings</button>
              <p>{coin.holdings * coin.price} $</p>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => handleRemoveCoin(coin.name)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tracker;
