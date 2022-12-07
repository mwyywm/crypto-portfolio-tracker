import React, { useEffect } from "react";
import "./Home.css";
import MarketInfo from "../components/MarketInfo";
import Table from "../components/Table.jsx";
import { AiOutlineArrowUp } from "react-icons/ai";

function Home() {
  useEffect(() => {
    if (document.title !== "cpt") {
      document.title = "cpt";
    }
  }, []);
  // TODO: Pagination component under table - use URL search params for page state
  return (
    <div className="home">
      <div className="content" style={{ minHeight: "100vh" }}>
        <MarketInfo />
        <Table page={1} />
      </div>
      <div className="scroll-to-top" onClick={() => scrollTo(top)}>
        <AiOutlineArrowUp />
        <p>Scroll to top!</p>
      </div>
    </div>
  );
}

export default Home;
