import React, { useState, useEffect, useRef } from "react";
import "./tracker.css";
import Breadcrumb from "../components/Breadcrumb";
import Modal from "../components/Modal";
import formatNumber from "../utils/formatNumber";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useSWR from "swr";
import DropdownCombobox from "../components/DropdownCombobox";

function Tracker() {
  const [modalError, setModalError] = useState(false); // boolean
  const [portfolio, setPortfolio] = useLocalStorage("portfolio", []); // name, holdings, price, uuid
  const allAPIIDs = portfolio.map((coin) => coin.apiID).join(",");
  const [modalContent, setModalContent] = useState({}); // name, apiID, image, holdings, price, uuid - this gets passed to portfolio
  const [showModal, setShowModal] = useState(false); // boolean
  const totalPortfolioValue = Number(
    portfolio
      .map((coin) => coin.price * coin.holdings)
      .reduce((a, b) => a + b)
      .toFixed(2)
  );
  const modalRef = useRef();
  useOnClickOutside(modalRef, handleClickOutsideModal); // click outside of modal hook

  const { data, error } = useSWR(
    allAPIIDs.length > 0 &&
      `https://api.coingecko.com/api/v3/simple/price?ids=${allAPIIDs}&vs_currencies=usd`,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        setPortfolio(
          portfolio.map((coin) => {
            return {
              ...coin,
              price: data[coin.apiID].usd,
            };
          })
        );
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  // portfolio functions
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
    if (typeof event.target.value === "string") {
      setModalContent({
        ...modalContent,
        holdings: parseFloat(event.target.value),
      });
    } else {
    }
  }
  function saveModalCoinToPortfolio() {
    if (modalContent.holdings > 0) {
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
      } else {
        // save new coin to portfolio
        const newPortfolio = [...portfolio, modalContent];
        setPortfolio(newPortfolio);
        setShowModal(false);
      }
    } else {
      // modalContent.holdings is 0 or less
      setModalError(true);
    }
  }
  function handleClickOutsideModal() {
    // hide modal when clicking outside of modal
    setShowModal(false);
  }
  useEffect(() => {
    if (document.title !== "cpt - Portfolio tracker") {
      document.title = "cpt - Portfolio tracker";
    }
  }, []);
  useEffect(() => {
    if (modalError) {
      setTimeout(() => {
        setModalError(false);
      }, 4000);
      // cleanup function
      return () => {
        clearTimeout();
      };
    }
  }, [modalError]);
  return (
    <>
      <Modal isShowing={showModal} ref={modalRef}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowModal(false)}
          className="modal-close"
        >
          <rect width="30" height="30" rx="6" />
          <path
            d="M14.9997 13.586L19.9497 8.63599L21.3637 10.05L16.4137 15L21.3637 19.95L19.9497 21.364L14.9997 16.414L10.0497 21.364L8.63574 19.95L13.5857 15L8.63574 10.05L10.0497 8.63599L14.9997 13.586Z"
            fill="white"
          />
        </svg>
        <div className="modal-content">
          <p className="modal-heading">{modalContent.name + " holdings:"}</p>
          <div className="modal-input-div">
            <p className="modal-error">
              {modalError && "Must be a number greater than 0!"}
            </p>
            <input
              type="number"
              className="modal-input"
              placeholder="Enter holdings"
              step="0.1"
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
          </div>
        </div>
        <div className="buttons-div">
          <button className="cancel" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="submit" onClick={saveModalCoinToPortfolio}>
            Submit
          </button>
        </div>
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
          <DropdownCombobox
            setShowModal={setShowModal}
            setModalContent={setModalContent}
            portfolio={portfolio}
          />
          <div className="portfolio">
            {portfolio.length > 0 && (
              <>
                <h2>
                  Total portfolio value:{" "}
                  {totalPortfolioValue
                    ? "$" + formatNumber(totalPortfolioValue, 2)
                    : ""}
                </h2>
                <div className="portfolio-box">
                  {portfolio.map((coin) => (
                    <div key={coin.uuid} className="portfolio-coin">
                      <div className="portfolio-coin-name">
                        {coin.image && (
                          <img
                            src={coin.image}
                            style={{
                              width: "32px",
                              height: "32px",
                              marginRight: "5px",
                            }}
                          />
                        )}
                        <p>{coin.name}</p>
                      </div>
                      <div className="portfolio-buttons">
                        <div className="portfolio-coin-holdings">
                          <p>
                            {coin.holdings} {coin.symbol}
                          </p>
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
                          <p>
                            {"$" + formatNumber(coin.holdings * coin.price, 2)}
                          </p>
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
