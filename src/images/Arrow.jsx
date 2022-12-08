import React from "react";

function ArrowDown({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={fill ? fill : "#fff"}
        d="M10 12.083l4.167-4.166H5.833L10 12.083z"
      ></path>
    </svg>
  );
}

function ArrowUp({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={fill ? fill : "#fff"}
        d="M10 7.917l-4.167 4.166h8.334L10 7.917z"
      ></path>
    </svg>
  );
}

export { ArrowDown, ArrowUp };
