import React from "react";
import "./Home.css";
import Coinrow from "../components/Coinrow.jsx";

function Home() {
  return (
    <div className="home">
      <div className="content">
        <Coinrow />
        {/* can put a go to top icon with text below table */}
      </div>
    </div>
  );
}

export default Home;
