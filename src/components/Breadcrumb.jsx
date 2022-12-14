import React from "react";
import { Link } from "react-router-dom";
import "./breadcrumb.css";
import Skeleton from "./Skeleton";

export default function Breadcrumb({ text }) {
  return (
    <div className="breadcrumb">
      {text ? (
        <>
          <Link to="/" className="breadcrumb-home">
            <p className="breadcrumb-home">Home</p>
          </Link>{" "}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>{text}</p>
        </>
      ) : (
        <Skeleton height="20px" width="120px" />
      )}
    </div>
  );
}
