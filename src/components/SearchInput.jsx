import React from "react";

export default function SearchInput({ onInput, value, onClick }) {
  return (
    <input
      className="search-input"
      placeholder="Search for a coin..."
      onInput={onInput}
      value={value}
      onClick={onClick}
    />
  );
}
