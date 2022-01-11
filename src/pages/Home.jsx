import React from "react";
import "./Home.css";
import Coinrow from "../components/Coinrow.jsx";
import { AiOutlineArrowUp } from "react-icons/ai";

function Home() {
  return (
    <div className="home">
      <div className="content" style={{ minHeight: "100vh" }}>
        <Coinrow />
      </div>
      <div className="scroll-to-top" onClick={() => scrollTo(top)}>
        <AiOutlineArrowUp />
        <p>Scroll to top of page </p>
      </div>
    </div>
  );
}

export default Home;
