import React from "react";

export default function SearchInput({ onInput, value, onClick }) {
  return (
    <>
      <input
        className="search-input"
        style={{ width: "200px" }}
        placeholder="Search..."
        onInput={onInput}
        value={value}
        onClick={onClick}
      />
    </>
  );
}
