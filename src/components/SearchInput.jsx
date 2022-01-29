import React from "react";

export default function SearchInput({ onInput, value, onClick }) {
  return (
    <>
      <input
        placeholder="Search..."
        onInput={onInput}
        value={value}
        onClick={onClick}
      />
    </>
  );
}
