import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Breadcrumb({ text }) {
  return (
    <div className="breadcrumb">
      {text && (
        <p className="breadcrumb-text">
          <Link to="/" className="breadcrumb-coins">
            Home
          </Link>{" "}
          <AiOutlineRight /> {text}
        </p>
      )}
    </div>
  );
}
