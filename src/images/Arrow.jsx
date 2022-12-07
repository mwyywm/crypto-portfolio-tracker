import React from "react";

function ArrowDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path fill="#2E3A59" d="M10 12.083l4.167-4.166H5.833L10 12.083z"></path>
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path fill="#2E3A59" d="M10 7.917l-4.167 4.166h8.334L10 7.917z"></path>
    </svg>
  );
}

export { ArrowDown, ArrowUp };
