import React, { useState, useRef, useEffect } from "react";
import "./trackersearch.css";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import useDebounce from "../hooks/useDebounce.jsx";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import uuid from "../utils/uuid";
import useSWR from "swr";
import { render } from "react-dom";
import { useCombobox } from "downshift";

export default function TrackerSearch({
  portfolio,
  setModalContent,
  setShowModal,
}) {
  const [searchTerm, setSearchTerm] = useState(""); // value of the search input
  const debouncedSearchTerm = useDebounce(searchTerm, 450); // search debounce
  const [results, setResults] = useState([]); // search results
  const [showResults, setShowResults] = useState(false); // boolean
  const [showError, setShowError] = useState(false); // boolean show search error

  const searchRef = useRef();
  useOnClickOutside(searchRef, handleClickOutside); // click outside of search results hook

  const { data: searchData, error: searchError } = useSWR(
    debouncedSearchTerm.length > 1
      ? `https://api.coingecko.com/api/v3/search?query=${debouncedSearchTerm}`
      : null,
    {
      revalidateOnFocus: false,
      onSuccess: (searchData) => {
        setResults(searchData.coins.slice(0, 30));
      },
    }
  );

  function handleInputChange(event) {
    // search handler
    event.preventDefault();
    setSearchTerm(event.target.value);
    // when to show results
    if (event.target.value.length <= 2) {
      setResults([]);
      setShowResults(false);
    }
    if (
      event.target.value.length > 2 &&
      event.target.value.match(/^[a-zA-Z0-9]+$/)
    ) {
      setSearchTerm(event.target.value);
      setShowResults(true);
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
      return setShowError(true);
    }
    if (event.target.tagName === "IMG") {
      // add to modalContent
      setModalContent({
        name: event.target.alt,
        apiID: results.find((result) => result.name === event.target.alt).id,
        image: results.find((result) => result.name === event.target.alt).large,
        symbol:
          results.find((result) => result.name === event.target.alt).symbol ||
          "",
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
      setShowError(false);
      setShowModal(true);
      setSearchTerm("");
      setResults([]);
    } else if (event.target.tagName === "P" || event.target.tagName === "LI") {
      setModalContent({
        name: event.target.innerText,
        apiID: results.find((result) => result.name === event.target.innerText)
          .id,
        image: results.find((result) => result.name === event.target.innerText)
          .large,
        symbol:
          results.find((result) => result.name === event.target.innerText)
            .symbol || "",
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
      setShowModal(true);
      // trigger modal and clear search + results
      setShowError(false);
      setSearchTerm("");
      setResults([]);
    }
  }
  function handleClickOutside() {
    // hide results div when clicking outside of search results div
    setShowResults(false);
  }
  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 4000);
      // cleanup function
      return () => {
        clearTimeout();
      };
    }
  }, [showError]);
  return (
    <>
      <p className="search-error">
        {showError === true && "Coin already exists in portfolio!"}
      </p>
      <div className="search-div" ref={searchRef}>
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
    </>
  );
}

export function DropdownCombobox({ portfolio, setModalContent, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // value of the search input
  const debouncedSearchTerm = useDebounce(searchTerm, 450); // search debounce
  const [results, setResults] = useState([]); // search results
  const [showError, setShowError] = useState(false); // boolean show search error

  const {
    isOpen,
    selectedItem,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: results,
    itemToString: (results) => (results ? results.name : ""),
    onSelectedItemChange: (item) => {
      handleSelect(item);
    },
    onInputValueChange: ({ inputValue }) => {
      console.log("inputValue:", inputValue);
      setSearchTerm(inputValue);
    },
  });
  function handleSearchClick(event) {
    event.preventDefault();
    console.log(event.target);
    // If the coin we click already exists in the portfolio, we don't want to add it again.
    if (
      [...portfolio].some(
        (coin) =>
          coin.name === event.target.alt || coin.name === event.target.innerText
      )
    ) {
      return setShowError(true);
    }
    if (event.target.tagName === "IMG") {
      // add to modalContent
      setModalContent({
        name: event.target.alt,
        apiID: results.find((result) => result.name === event.target.alt).id,
        image: results.find((result) => result.name === event.target.alt).large,
        symbol:
          results.find((result) => result.name === event.target.alt).symbol ||
          "",
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
      setShowError(false);
      setShowModal(true);
      setSearchTerm("");
      setResults([]);
    } else if (event.target.tagName === "P" || event.target.tagName === "LI") {
      setModalContent({
        name: event.target.innerText,
        apiID: results.find((result) => result.name === event.target.innerText)
          .id,
        image: results.find((result) => result.name === event.target.innerText)
          .large,
        symbol:
          results.find((result) => result.name === event.target.innerText)
            .symbol || "",
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
      setShowModal(true);
      // trigger modal and clear search + results
      setShowError(false);
      setSearchTerm("");
      setResults([]);
    }
  }
  function handleSelect(item) {
    // if coin already exists, show error.
    if ([...portfolio].some((coin) => coin.name === item.selectedItem.name)) {
      return setShowError(true);
    } else {
      setModalContent({
        name: item.selectedItem.name,
        apiID: item.selectedItem.id,
        image: item.selectedItem.large,
        symbol: item.selectedItem.symbol,
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
      setShowModal(true);
    }
  }
  const { data: searchData, error: searchError } = useSWR(
    debouncedSearchTerm.length > 1
      ? `https://api.coingecko.com/api/v3/search?query=${debouncedSearchTerm}`
      : null,
    {
      revalidateOnFocus: false,
      onSuccess: (searchData) => {
        setResults(searchData.coins.slice(0, 30));
      },
    }
  );
  return (
    <>
      <p className="search-error">
        {showError === true && "Coin already exists in portfolio!"}
      </p>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} />
      </div>
      <div>
        <ul {...getMenuProps()} className="results-container">
          {isOpen &&
            results.map((result, i) => (
              <li
                key={result.name}
                onClick={handleSearchClick}
                className="coin-search-result"
                {...getItemProps({
                  item: result,
                  style: {
                    backgroundColor:
                      i === highlightedIndex ? "lightblue" : "white",
                  },
                })}
              >
                <img src={result.thumb} alt={result.name} />
                <p>{result.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

render(<DropdownCombobox />, document.getElementById("root"));
