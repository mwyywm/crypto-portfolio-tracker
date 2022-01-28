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
    if (event.target.value.length > 2) {
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
          console.log(res.data.coins);
          setResults(res.data.coins);
        });
    } else {
    }
  }, [debouncedSearchTerm]);
  console.log(debouncedSearchTerm);
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
          <div>
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <p>{result.symbol}</p>
                  <p>{result.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tracker;
