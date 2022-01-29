import React, { useState, useEffect } from "react";
import "./tracker.css";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import axios from "axios";
import useDebounce from "../hooks/useDebounce.jsx";

function Tracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 450);
  const [results, setResults] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  function handleInputChange(event) {
    event.preventDefault();
    if (
      event.target.value.length > 2 &&
      event.target.value.match(/^[a-zA-Z0-9]+$/)
    ) {
      setSearchTerm(event.target.value);
      console.log("event.target.value:", event.target.value);
    }
  }
  function handleClick(event) {
    if (event.target.tagName === "IMG") {
      console.log(event.target.alt);
      portfolio.push(event.target.alt);
    } else {
      console.log(event.target.innerText);
      portfolio.push(event.target.innerText);
    }
    console.log("portfolio", portfolio);
  }

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/search?query=${debouncedSearchTerm}`
        )
        .then((res) => {
          // console.log(res.data.coins.slice(0, 15)); // only want first 15 results
          setResults(res.data.coins.slice(0, 15));
        });
    } else {
    }
  }, [debouncedSearchTerm]);
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
        <div className="search">
          <SearchInput onInput={handleInputChange} />
          <SearchResults data={results} onClick={handleClick} />
        </div>
        <div>
          <p>Portfolio:</p>
          <ul className="portfolio">
            {portfolio.map((coin) => (
              <li key={coin}>
                <p>{coin}</p>
                <p>Holdings: localstorage</p>
                <button>edit holdings</button>
                <button style={{ backgroundColor: "red" }}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Tracker;
