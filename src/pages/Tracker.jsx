import React, { useState, useEffect, useRef } from "react";
import "./tracker.css";
import Breadcrumb from "../components/Breadcrumb";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import Modal from "../components/Modal";
import axios from "axios";
import useDebounce from "../hooks/useDebounce.jsx";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useLocalStorage } from "../hooks/useLocalStorage";
import uuid from "../utils/uuid";

function Tracker() {
  const [searchTerm, setSearchTerm] = useState(""); // value of the search input
  const debouncedSearchTerm = useDebounce(searchTerm, 450); // search debounce
  const [results, setResults] = useState([]); // search results
  const [showResults, setShowResults] = useState(false); // boolean
  const [searchError, setSearchError] = useState(false); // boolean
  const [portfolio, setPortfolio] = useLocalStorage("portfolio", []); // name, holdings, price, uuid
  const [modalContent, setModalContent] = useState({}); // name, apiID, holdings, price, uuid - modalContent is later passed to portfolio
  const [totalHoldings, setTotalHoldings] = useState(0); // total holdings of all coins
  const [showModal, setShowModal] = useState(false); // boolean
  let [triggerFetch, setTriggerFetch] = useState(1); // force rerender
  const ref = useRef();
  useOnClickOutside(ref, handleClickOutside); // click outside of search results hook
  // TODO: search results navigation with arrow keys
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
    // If the coin we click already exists in the portfolio, we don't want to add it again.
    if (
      [...portfolio].some(
        (coin) =>
          coin.name === event.target.alt || coin.name === event.target.innerText
      )
    ) {
      return setSearchError(true);
    }
    if (event.target.tagName === "IMG") {
      // add to modalContent
      setModalContent({
        name: event.target.alt,
        apiID: results.find((result) => result.name === event.target.alt).id,
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
      setSearchError(false);
      setShowModal(true);
      setSearchTerm("");
      setResults([]);
    } else if (event.target.tagName === "P" || event.target.tagName === "LI") {
      setModalContent({
        name: event.target.innerText,
        apiID: results.find((result) => result.name === event.target.innerText)
          .id,
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
      setSearchError(false);
      setShowModal(true);
      setSearchTerm("");
      setResults([]);
    }
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
      apiID: coinToUpdate.apiID,
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
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    if (portfolio.length > 0) {
      // fetch prices for all coins in the portfolio
      const promises = portfolio.map((coin) => {
        const url = `https://api.coingecko.com/api/v3/coins/${coin.apiID}`;
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
  useEffect(() => {
    // calculate total holdings
    let total = 0;
    portfolio.map((coin) => {
      total += coin.holdings * coin.price;
    });
    setTotalHoldings(total);
  }, [portfolio]);
  useEffect(() => {
    setTimeout(() => {
      setSearchError(false);
    }, 4000);
    // cleanup function
    return () => {
      clearTimeout();
    };
  }, [searchError]);
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
        <Breadcrumb text="Portfolio tracker" />
        <section className="tracker-heading">
          <h1>Portfolio tracker</h1>
          <p className="tracker-paragraph">
            Track the value of all your cryptocurrencies! Add coins to your
            portfolio tracker and the total portfolio value will be tracked.
          </p>
        </section>
        <section className="bottom-section">
          <p className="search-error">
            {searchError && "Coin already exists in portfolio!"}
          </p>
          <div className="search-div" ref={ref}>
            <SearchInput
              onInput={handleInputChange}
              value={searchTerm}
              onClick={() => setShowResults(true)}
            />
            <SearchResults
              data={results}
              onClick={handleSearchClick}
              showResults={showResults}
            />
          </div>
          <div className="portfolio">
            {portfolio.length > 0 && (
              <>
                <h2>
                  Total portfolio value:{" "}
                  {totalHoldings ? "$" + totalHoldings?.toFixed(2) : "..."}
                </h2>
                <div className="portfolio-box">
                  {portfolio.map((coin) => (
                    <div key={coin.uuid} className="portfolio-coin">
                      <div className="portfolio-coin-name">
                        <p>{coin.name}</p>
                      </div>
                      <div className="portfolio-coin-holdings">
                        <p>{coin.holdings}</p>
                        <button onClick={handleEdit} id={coin.name}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            id={coin.name}
                          >
                            <path
                              fill="none"
                              d="M0 0h24v24H0z"
                              id={coin.name}
                            />
                            <path
                              d="M5 19h1.414l9.314-9.314-1.414-1.414L5 17.586V19zm16 2H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L9.243 19H21v2zM15.728 6.858l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414z"
                              id={coin.name}
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="portfolio-coin-total">
                        <p>{"$" + (coin.holdings * coin.price)?.toFixed(2)}</p>
                        <button onClick={() => handleRemoveCoin(coin.name)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </section>
    </>
  );
}

export default Tracker;
