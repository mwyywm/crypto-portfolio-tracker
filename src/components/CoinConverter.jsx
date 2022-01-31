import react, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { IoIosSwap } from "react-icons/io";
import dollarSign from "../images/dollarSign.png";

const Input = styled.input`
  height: 50px;
  border: none;
  font-size: 16px;
  &:focus {
    outline: 1px solid black;
  }
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid black;
`;
const ConverterBox = styled.div``;
const ConverterTitle = styled.h1`
  font-weight: bold;
  margin-bottom: 10px;
`;

export default function CoinConverter({ priceOfCoin, symbol, coinImage }) {
  const [amount, setAmount] = useState(1);
  const [stable, setStable] = useState(priceOfCoin);

  function handleCoinChange(e) {
    // if "coin" input is last changed then input2 is changed
    e.preventDefault();
    if (e.target.value >= 0) {
      setAmount(e.target.value);
      setStable(priceOfCoin * amount);
    }
  }
  function handleUSDChange(e) {
    e.preventDefault();
    // if "USD" input is last changed then input1 is changed
    if (e.target.value >= 0) {
      setStable(e.target.value);
      setAmount(e.target.value / priceOfCoin);
    }
  }

  useEffect(() => {
    setStable(priceOfCoin * amount);
  }, [amount]);
  return (
    <ConverterBox>
      <ConverterTitle>{symbol?.toUpperCase()} to USD Converter</ConverterTitle>
      <div
        style={{
          display: "flex",
          flexAlign: "center",
          alignItems: "center",
        }}
      >
        <InputBox>
          <img
            src={coinImage}
            width="30px"
            height="30px"
            style={{ margin: "2px" }}
          />
          <Input
            value={amount}
            onInput={handleCoinChange}
            name="coin"
            type="number"
            step="0.10"
          />
        </InputBox>
        <IoIosSwap size="30px" fill="black" />
        <InputBox>
          <img
            src={dollarSign}
            width="34px"
            height="34px"
            style={{ margin: "2px" }}
          />
          <Input
            value={stable}
            onInput={handleUSDChange}
            name="USD"
            type="number"
            step="0.10"
          />
        </InputBox>
      </div>
    </ConverterBox>
  );
}
