import react, { useState } from "react";
import styled from "@emotion/styled";

export default function CoinConverter({ priceOfCoin, symbol, image }) {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState(priceOfCoin);
  const [converted, setConverted] = useState(amount * currency);

  const Input = styled.input`
    width: 150px;
    margin: 0 10px;
    height: 30px;
    padding: 0 10px;
    border: none;
    font-size: 16px;
  `;
  const InputBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    background-color: white;
    border: 1px solid black;
  `;
  const ConverterBox = styled.div``;
  const ConverterTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  function handleCoinChange(e) {
    // if "coin" input is last changed then input2 is changed
    e.preventDefault();
    if (e.target.value >= 0) {
      setAmount(e.target.value);
      setCurrency(priceOfCoin * amount);
    }
  }
  function handleUSDChange(e) {
    e.preventDefault();
    // if "USD" input is last changed then input1 is changed
    if (e.target.value >= 0) {
      setCurrency(e.target.value);
      setAmount(e.target.value / priceOfCoin);
    }
  }

  return (
    <ConverterBox>
      <ConverterTitle>hello</ConverterTitle>
      <InputBox>
        <p>{symbol?.toUpperCase()}</p>
        <Input
          type="number"
          pattern="/^\d+$/" // digits
          value={amount}
          min={0}
          onChange={handleCoinChange}
          key="coin"
          name="coin"
        />
      </InputBox>
      <InputBox>
        <p>USD</p>
        <Input
          type="number"
          pattern="/^\d+$/" // digits
          value={currency}
          min={0}
          onChange={handleUSDChange}
          key="U"
          name="USD"
        />
      </InputBox>
    </ConverterBox>
  );
}
