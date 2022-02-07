import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { IoIosSwap } from "react-icons/io";
import dollarSign from "../images/dollarsign.png";

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
      setStable(parseFloat(priceOfCoin * amount));
    } else if (document.activeElement === stableRef.current) {
      setAmount((stable / priceOfCoin).toFixed(8));
    }
  }, [amount, stable]);
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
            ref={coinRef}
            value={amount}
            onInput={handleInputChange}
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
            ref={stableRef}
            value={stable}
            onInput={handleInputChange}
            name="USD"
            type="number"
            step="0.10"
          />
        </InputBox>
      </div>
    </ConverterBox>
  );
}
