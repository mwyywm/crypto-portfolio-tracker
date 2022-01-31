import react, { useState } from "react";

export default function CoinConverter({ priceOfCoin, nameOfCoin }) {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState(priceOfCoin);

  function handleCoinChange(e) {
    // if "coin" input is last changed then input2 is changed
    e.preventDefault();
    setAmount(e.target.value);
    setCurrency(priceOfCoin * e.target.value);
  }
  function handleUSDChange(e) {
    e.preventDefault();
    // if "USD" input is last changed then input1 is changed
    setCurrency(e.target.value);
    setAmount(e.target.value / priceOfCoin);
  }

  return (
    <div>
      <input type="number" value={amount} onChange={handleCoinChange} />
      <input type="number" value={currency} onChange={handleUSDChange} />
    </div>
  );
}
