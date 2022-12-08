import React, { useState, useEffect, useRef } from "react";
import "./tracker.css";
import Breadcrumb from "../components/Breadcrumb";
import Modal from "../components/Modal";
import formatNumber from "../utils/formatNumber";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useSWR from "swr";
import DropdownCombobox from "../components/DropdownCombobox";
import PieChart from "../components/PieChart";
import PortfolioCoin from "../components/PortfolioCoin";

function Tracker() {
  const [modalError, setModalError] = useState(false); // boolean
  const [portfolio, setPortfolio] = useLocalStorage("portfolio", []); // name, holdings, price, uuid
  const allAPIIDs = portfolio.map((coin) => coin.apiID).join(",");
  const [modalContent, setModalContent] = useState({}); // name, apiID, image, holdings, price, uuid - this gets passed to portfolio
  const [showModal, setShowModal] = useState(false); // boolean
  const totalPortfolioValue =
    portfolio.length > 0
      ? Number(
          portfolio
            .map((coin) => coin.price * coin.holdings)
            .reduce((a, b) => a + b)
            .toFixed(2)
        )
      : null;

  const modalRef = useRef();
  const lastModalEl = useRef(null);
  const firstModalEl = useRef(null);

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
  useEffect(() => {
    document.title = "cpt - Portfolio tracker";
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
    <React.Fragment>
      <Modal isShowing={showModal} setShowModal={setShowModal} ref={modalRef}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowModal(false)}
          className="modal-close"
          tabIndex="0"
          ref={firstModalEl}
          onKeyDown={(e) => {
            if (e.key === "Tab" && e.shiftKey) {
              // if we are on the first element and press shift + tab we focus the last element
              e.preventDefault();
              lastModalEl.current.focus();
            } else if (e.key === "Enter") {
              setShowModal(false);
            }
          }}
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
                }
              }}
            />
          </div>
        </div>
        <div className="buttons-div">
          <button className="cancel" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button
            className="submit"
            onClick={saveModalCoinToPortfolio}
            ref={lastModalEl}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                // if we are on the first element and press tab we focus the first element
                e.preventDefault();
                firstModalEl.current.focus();
              }
            }}
          >
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
                    <PortfolioCoin
                      coin={coin}
                      handleEdit={handleEdit}
                      handleRemoveCoin={handleRemoveCoin}
                      key={coin.uuid}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="pie-div">
              <PieChart data={portfolio} />
            </div>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
}

export default Tracker;
