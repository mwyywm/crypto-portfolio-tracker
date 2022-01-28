import React, { useState, useEffect } from "react";
import "./tracker.css";
import SearchInput from "../components/SearchInput";
import axios from "axios";
import useDebounce from "../hooks/useDebounce.jsx";

function Tracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 450);
  const [results, setResults] = useState([]);

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
  console.log(results);
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
          <div className="coin-results">
            {results.map((result) => (
              <div key={result.id} className="coin-search-result">
                <img src={result.thumb} alt={result.name} />
                <p>{result.symbol}</p>
                <p>{result.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tracker;
