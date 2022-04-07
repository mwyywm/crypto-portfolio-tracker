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
  let [triggerFetch, setTriggerFetch] = useState(1); // counter to trigger fetching data from api???
  const ref = useRef();
  useOnClickOutside(ref, handleClickOutside); // click outside of search results hook
  // TODO: search results navigation
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
    //TODO: Error handling should be shown above search input
    // If the coin we click already exists in the portfolio, we don't want to add it again.
    if (
      [...portfolio].some(
        (coin) =>
          coin.name === event.target.alt || coin.name === event.target.innerText
      )
    ) {
      return; // TODO: We should show that the coin already exists in the portfolio.
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
  function handleClickOutside() {
    // hide results div when clicking outside of search results div
    setShowResults(false);
  }
  function handleRemoveCoin(coinToRemove) {
    const newPortfolio = portfolio.filter((coin) => coin.name !== coinToRemove);
    setPortfolio(newPortfolio);
  }
  function handleEdit(event) {
    // The coin with the same name as id is the coin we want to update.
    const coinToUpdate = portfolio.find(
      (coin) => coin.name === event.target.id
    );
    // we set the modalContent to the coin we want to update.
    setModalContent({
      name: coinToUpdate.name,
      holdings: event.target.value,
      price: coinToUpdate.price,
      uuid: coinToUpdate.uuid,
    });
    setShowModal(true);
  }
  // modal functions
  function handleHoldingsChange(event) {
    // holdings change handler
    event.preventDefault();
    setModalContent({ ...modalContent, holdings: Number(event.target.value) });
  }
  function saveModalCoinToPortfolio() {
    if ([...portfolio].some((coin) => coin.name === modalContent.name)) {
      // save existing coin to portfolio
      const coinToUpdate = portfolio.find(
        (coin) => coin.name === modalContent.name
      );
      const index = portfolio.indexOf(coinToUpdate);
      // changing the holdings value in the portfolio
      portfolio[index].holdings = modalContent.holdings;
      // only the value of "portfolio[index].holdings" is changed, not the whole object
      setPortfolio([...portfolio]);
      setShowModal(false);
      setTriggerFetch((triggerFetch += 1));
    } else {
      // save new coin to portfolio
      const newPortfolio = [...portfolio, modalContent];
      setPortfolio(newPortfolio);
      setShowModal(false);
      setTriggerFetch((triggerFetch += 1));
    }
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
  useEffect(() => {
    if (portfolio.length > 0) {
      // fetch prices for all coins in the portfolio
      const promises = portfolio.map((coin) => {
        const url =
          `https://api.coingecko.com/api/v3/coins/${coin.name.toLowerCase()}`.replaceAll(
            " ",
            "-"
          );
        return axios.get(url);
      });
      let newPortfolio = portfolio;
      Promise.all(promises)
        .then((res) => {
          newPortfolio = portfolio.map((coin, index) => {
            return {
              ...coin,
              price: res[index].data.market_data.current_price.usd,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPortfolio(newPortfolio);
        });
    }
  }, [triggerFetch]);
  useEffect(() => {
    setTriggerFetch((triggerFetch += 1));
  }, []);
  return (
    <>
      <Modal isShowing={showModal}>
        <p>{modalContent.name}</p>
        <input
          type="number"
          min="0"
          onChange={handleHoldingsChange}
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveModalCoinToPortfolio();
            } else if (e.key === "Escape" || e.key === "Esc") {
              setShowModal(false);
            }
          }}
        />
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
                <button onClick={handleEdit} id={coin.name}>
                  edit
                </button>
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
