import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { IoIosSwap } from "react-icons/io";
import dollarSign from "../images/dollarsign.png";

const ConverterBox = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  @media (max-width: 960px) {
    max-width: 100%;
  }
`;
const ConverterTitle = styled.h1`
  font-weight: 400;
  margin-bottom: 10px;
  text-align: center;
`;
const InputDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 490px;
  align-items: center;
  max-width: 100%;
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
  }
`;
const Input = styled.input`
  height: 50px;
  border: none;
  width: auto;
  max-width: 100%;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: white;
  border: none;
  max-width: 97%;
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
      <InputDiv>
        <InputBox>
          <img
            src={coinImage}
            width="40px"
            height="40px"
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
            width="40px"
            height="40px"
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
      </InputDiv>
    </ConverterBox>
  );
}
