import React, { useState, useRef } from "react";
import "./trackersearch.css";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import useDebounce from "../hooks/useDebounce.jsx";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import uuid from "../utils/uuid";
import useSWR from "swr";

export default function TrackerSearch({
  portfolio,
  setModalContent,
  setShowModal,
}) {
  const [searchTerm, setSearchTerm] = useState(""); // value of the search input
  const debouncedSearchTerm = useDebounce(searchTerm, 450); // search debounce
  const [results, setResults] = useState([]); // search results
  const [showResults, setShowResults] = useState(false); // boolean
  const [displayError, setDisplayError] = useState({
    modal: false,
    search: false,
  }); // boolean

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
      return setDisplayError({ ...displayError, search: true });
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
      setDisplayError({ ...displayError, search: false });
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
      setDisplayError({ ...displayError, search: false });
      setShowModal(true);
      setSearchTerm("");
      setResults([]);
    }
  }
  function handleClickOutside() {
    // hide results div when clicking outside of search results div
    setShowResults(false);
  }
  return (
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
  );
}
