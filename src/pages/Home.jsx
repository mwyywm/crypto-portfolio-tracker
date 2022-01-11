import React from "react";
import "./Home.css";
import Coinrow from "../components/Coinrow.jsx";
import Pagination from "@mui/material/Pagination";

function Home() {
  return (
    <div className="home">
      <div className="content">
        <Coinrow />
        {/* can put a go to top icon with text below table */}
        {/* Pagination component would go here */}
        {/*  */}
      </div>
    </div>
  );
}

export default Home;
