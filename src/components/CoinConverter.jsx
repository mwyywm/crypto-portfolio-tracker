import { useEffect, useState, useRef } from "react";
import "./coinConverter.css";
import { IoIosSwap } from "react-icons/io";
import dollarSign from "../images/dollarsign.png";

export default function CoinConverter({ priceOfCoin, symbol, coinImage }) {
  const [amount, setAmount] = useState(1);
  const [stable, setStable] = useState(priceOfCoin);
  const coinRef = useRef(null);
  const stableRef = useRef(null);

  function handleInputChange(e) {
    e.preventDefault();
    if (e.target.value >= 0 && document.activeElement === coinRef.current) {
      // coin input focused and over 0
      setAmount(e.target.value);
    } else if (
      e.target.value >= 0 &&
      document.activeElement === stableRef.current
    ) {
      // usd input focused and over 0
      setStable(e.target.value);
    }
  }

  useEffect(() => {
    // handling the alternate input number change
    if (document.activeElement === coinRef.current) {
      setStable(parseFloat((priceOfCoin * amount)?.toFixed(4)));
    } else if (document.activeElement === stableRef.current) {
      setAmount((stable / priceOfCoin)?.toFixed(8));
    }
  }, [amount, stable]);
  return (
    <div className="converter-box">
      <h1 className="converter-title">
        {symbol?.toUpperCase()} to USD Converter
      </h1>
      <div className="wrapper">
        <div className="input-box">
          <img
            src={coinImage}
            width="32px"
            height="32px"
            style={{ margin: "2px" }}
          />
          <input
            className="input"
            ref={coinRef}
            value={amount}
            onInput={handleInputChange}
            name="coin"
            type="number"
            step="0.10"
          />
        </div>
        <div className="separator">
          <IoIosSwap size="28px" fill="white" />
        </div>
        <div className="input-box">
          <img
            src={dollarSign}
            width="32px"
            height="32px"
            style={{ margin: "2px" }}
          />
          <input
            className="input"
            ref={stableRef}
            value={stable}
            onInput={handleInputChange}
            name="USD"
            type="number"
            step="0.10"
          />
        </div>
      </div>
    </div>
  );
}
