import React, { useEffect } from "react";
import "./Home.css";
import MarketInfo from "../components/MarketInfo";
import Coinrow from "../components/Coinrow.jsx";
import { AiOutlineArrowUp } from "react-icons/ai";

function Home() {
  useEffect(() => {
    if (document.title !== "cpt") {
      document.title = "cpt";
    }
  }, []);
  return (
    <div className="home">
      <div className="content" style={{ minHeight: "100vh" }}>
        <MarketInfo />
        <Coinrow />
      </div>
      <div className="scroll-to-top" onClick={() => scrollTo(top)}>
        <AiOutlineArrowUp />
        <p>Scroll to top!</p>
      </div>
    </div>
  );
}

export default Home;
