import React from "react";

export default function SearchInput({ onInput }) {
  return (
    <>
      <input placeholder="Search..." onInput={onInput} />
    </>
  );
}
