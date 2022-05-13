import React, { useState, useEffect, useRef } from "react";
import "./dropdowncombobox.css";
import useDebounce from "../hooks/useDebounce.jsx";
import uuid from "../utils/uuid";
import useSWR from "swr";
import { useCombobox } from "downshift";
import { useNavigate } from "react-router-dom";

export default function DropdownCombobox({
  portfolio,
  setModalContent,
  setShowModal,
}) {
  const [searchTerm, setSearchTerm] = useState(""); // value of the search input
  const debouncedSearchTerm = useDebounce(searchTerm, 450); // search debounce
  const [results, setResults] = useState([]); // search results
  const [showError, setShowError] = useState(false); // boolean show search error

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    setInputValue,
  } = useCombobox({
    items: results,
    itemToString: (results) => (results ? results.name : ""),
    onSelectedItemChange: (item) => {
      handleSelect(item);
    },
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue);
    },
  });
  function handleSelect(item) {
    const { selectedItem } = item;
    // if coin already exists, show error.
    if ([...portfolio].some((coin) => coin.name === selectedItem.name)) {
      return setShowError(true);
    } else {
      setModalContent({
        name: selectedItem.name,
        apiID: selectedItem.id,
        image: selectedItem.large,
        symbol: selectedItem.symbol,
        holdings: 0,
        price: 0,
        uuid: uuid(),
      });
      setShowError(false);
      setShowModal(true);
      setSearchTerm("");
      setResults([]);
      setInputValue("");
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
      setInputValue("");
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
      setInputValue("");
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

  useEffect(() => {
    let timedError = setTimeout(() => {
      // if there is an error, show error message for 3 seconds
      showError && setShowError(false);
    }, 3000);
    // cleanup function
    return () => {
      clearTimeout(timedError);
    };
  }, [showError]);

  return (
    <>
      <p className="search-error">
        {showError === true && "Coin already exists in portfolio!"}
      </p>
      <div {...getComboboxProps()} className="search-div">
        <input
          {...getInputProps()}
          className="search-input"
          placeholder="Search for a coin"
          onInput={(event) => {
            if (event.target.value.length === 0) {
              setResults([]);
            }
          }}
        />
      </div>
      <div className="results-div">
        <ul {...getMenuProps()} className="results-container-ul">
          {isOpen &&
            results.map((result, i) => (
              <li
                key={result.name}
                {...getItemProps({
                  item: result,
                  style: {
                    backgroundColor: i === highlightedIndex ? "#c7c7c7" : null,
                  },
                })}
                className="coin-search-li"
                onClick={(e) => handleSearchClick(e)}
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

export function NavbarSearch({
  placeholder,
  inputWidth,
  resultsWidth,
  setShowSearch,
}) {
  const [searchTerm, setSearchTerm] = useState(""); // value of the search input
  const debouncedSearchTerm = useDebounce(searchTerm, 450); // search debounce
  const [results, setResults] = useState([]); // search results
  const navigate = useNavigate();
  const searchRef = useRef();
  const {
    isOpen,
    selectedItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    setInputValue,
  } = useCombobox({
    items: results,
    itemToString: (results) => (results ? results.name : ""),
    onSelectedItemChange: (item) => {
      handleSelect(item);
    },
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue);
    },
  });
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
  function handleSelect(item) {
    // router push to coin page
    navigate(`/coin/${item.selectedItem.id}`);
    setShowSearch(false); // closing search div in Navbar component
    setInputValue("");
  }
  function handleSearchClick(coinID) {
    // router push to coin page
    navigate(`/coin/${coinID}`);
    setShowSearch(false); // closing search div in Navbar component
    setInputValue("");
  }
  function handleKeyDown(e) {
    // CTRL + K to focus on nav search
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
      e.preventDefault(); // prevent ctrl+k from opening the search bar.
      searchRef.current.focus();
    }
  }
  useEffect(() => {
    addEventListener("keydown", handleKeyDown);
    return () => {
      removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div
        {...getComboboxProps()}
        className="search-div-nav"
        style={inputWidth ? { width: inputWidth } : {}}
      >
        <input
          {...getInputProps({
            ref: searchRef,
          })}
          className="search-input-nav"
          placeholder={placeholder ? placeholder : "Search for a coin"}
        />
      </div>
      <div
        className="results-div"
        style={resultsWidth ? { width: resultsWidth } : {}}
      >
        <ul
          {...getMenuProps()}
          className="results-container-ul"
          style={resultsWidth ? { width: resultsWidth } : {}}
        >
          {isOpen &&
            results.map((result, i) => (
              <li
                key={result.name}
                {...getItemProps({
                  item: result,
                  style: {
                    backgroundColor: i === highlightedIndex ? "#c7c7c7" : null,
                  },
                })}
                className="coin-search-li"
                onClick={() => handleSearchClick(result.id)}
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
