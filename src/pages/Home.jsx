import React, { useEffect, useState } from "react";
import "./Home.css";
import Coinrow from "../components/Coinrow.jsx";

function Home() {
  return (
    <div className="home">
      <div className="content">
        <Coinrow />
      </div>
    </div>
  );
}

export default Home;
