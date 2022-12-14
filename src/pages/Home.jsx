import React, { useEffect, useState } from "react";
import "./Home.css";
import MarketInfo from "../components/MarketInfo";
import Table from "../components/Table.jsx";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Pagination } from "../components/Pagination.jsx";
import { useSearchParams } from "react-router-dom";
function Home() {
  const [searchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState();

  useEffect(() => {
    document.title = "cpt";
  }, []);

  useEffect(() => {
    setCurrPage(searchParams.get("pg"));
  }, [searchParams]);

  // TODO: Pagination component under table - use URL search params for page state
  return (
    <section className="home">
      <div className="content" style={{ minHeight: "100vh" }}>
        <MarketInfo />
        <Table page={currPage} />
      </div>
      <div className="pagination-wrapper">
        <Pagination currentPage={0} totalPages={100} />
      </div>
    </section>
  );
}

export default Home;
