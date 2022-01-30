import React, { useState, useEffect, useRef } from "react";
import "./tracker.css";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import axios from "axios";
import useDebounce from "../hooks/useDebounce.jsx";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

function Tracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 450);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const ref = useRef();

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
      // console.log("event.target.value:", event.target.value);
    }
  }

  function handleSearchClick(event) {
    event.preventDefault();
    setShowResults(true); // show results div
    if (event.target.tagName === "IMG") {
      console.log(event.target.alt);
      setPortfolio([...portfolio, event.target.alt]);
      portfolio.push(event.target.alt);
    } else {
      console.log(event.target.innerText);
      portfolio.push(event.target.innerText);
    }
    setSearchTerm("");
    setResults([]);
  }
  function handleClickOutside(event) {
    // hide results div when clicking outside of it
    setShowResults(false);
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
              key={coin}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "450px",
                maxWidth: "100%",
              }}
            >
              <p>{coin}</p> <p>10.220</p>
              <button>edit holdings</button>
              <p>20000 $</p>
              <button style={{ backgroundColor: "red" }}>X</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tracker;
