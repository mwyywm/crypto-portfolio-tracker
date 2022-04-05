import React, { useState, useEffect, useRef } from "react";
import "./tracker.css";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import Modal from "../components/Modal";
import axios from "axios";
import useDebounce from "../hooks/useDebounce.jsx";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useLocalStorage } from "../hooks/useLocalStorage";
import uuid from "../utils/uuid";

function Tracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 450);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [portfolio, setPortfolio] = useLocalStorage("portfolio", []); // name, holdings, price, uuid
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({}); // name, holdings, price, uuid - modalContent is later passed to portfolio
  const ref = useRef();
  // TODO: After we add a coin to the portfolio, we fetch the new prices for the coins.
  // TODO: On page load we fetch the prices for all the coins in the portfolio.
  function handleInputChange(event) {
    // search handler
    event.preventDefault();
    setSearchTerm(event.target.value);
    setShowResults(true);
    // when to show results
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
    //TODO: error handling should be shown above search input
    // If the coin we click already exists in the portfolio, we don't want to add it again.
    if (
      [...portfolio].some(
        (coin) =>
          coin.name === event.target.alt || coin.name === event.target.innerText
      )
    ) {
      return; // TODO: we should show that the coin already exists in the portfolio.
    }
    if (event.target.tagName === "IMG") {
      // add to modalContent
      setModalContent({
        name: event.target.alt,
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
    } else if (event.target.tagName === "P") {
      setModalContent({
        name: event.target.innerText,
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
    } else if (event.target.tagName === "DIV") {
      setModalContent({
        name: event.target.innerText,
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
    }
    setShowModal(true);
    setSearchTerm("");
    setResults([]);
  }
  function handleClickOutside(e) {
    // hide results div when clicking outside of search results div
    setShowResults(false);
  }
  function handleRemoveCoin(coinToRemove) {
    const newPortfolio = portfolio.filter((coin) => coin.name !== coinToRemove);
    setPortfolio(newPortfolio);
  }
  // modal functions
  function handleHoldingsChange(event) {
    // holdings change handler
    event.preventDefault();
    setModalContent({ ...modalContent, holdings: Number(event.target.value) });
  }
  function saveModalCoinToPortfolio() {
    setPortfolio([...portfolio, { ...modalContent }]);
    setShowModal(false);
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

  useOnClickOutside(ref, handleClickOutside); // click outside of search results hook
  return (
    <>
      <Modal isShowing={showModal}>
        <p>{modalContent.name}</p>
        <input type="number" min="0" onChange={handleHoldingsChange} />
        <button onClick={() => setShowModal(false)}>❌</button>
        <button onClick={saveModalCoinToPortfolio}>🟢</button>
      </Modal>
      <section className="tracker">
        <h1>Portfolio tracker</h1>
        <p>we should be able to add/remove coins</p>K
        <p>we should be able to Change value of holdings</p>
        <p>
          the information should be saved in localstorage so we can view it
          later
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
                <p>{coin.holdings}</p>
                <button>Edit holdings</button>
                <p>{coin.holdings * coin.price} $</p>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleRemoveCoin(coin.name)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Tracker;
