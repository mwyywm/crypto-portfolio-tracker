import React, { useEffect, useState } from "react";
import "./coinrow.css";
import { Link, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import formatNumber from "../utils/formatNumber";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";

// Table and pagination component
function CoinRow() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const pg = searchParams.get("pg");
  const [page, setPage] = useState(pg ? pg : 1); // I want to move this into searchparams so we can link to the pagination page.
  // const { data, error } = useSWR(
  //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`,
  //   fetcher
  // );
  const { data, error } = ["temp"];
  // TODO: REMOVE THIS WHEN DONE WITH MarketInfo component
  const handleChange = (event, value) => {
    scrollTo(top);
    setPage(value);
  };
  useEffect(() => {
    // reset the page to 1 when we click logo or home on navbar.
    if (pg === null) {
      setPage(1);
    }
  }, [pg, page]);
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <Link to={`/coin/${row.id}`}>{row.name}</Link>,
    },
    {
      name: "Price",
      selector: (row) => row?.current_price,
      sortable: true,
      style: {
        whiteSpace: "nowrap",
      },
      cell: (row) => (
        <div className="price-cell">
          <p>${formatNumber(row?.current_price)}</p>
        </div>
      ),
    },
    {
      name: "Market Cap",
      selector: (row) => row?.market_cap,
      left: true,
      sortable: true,
      cell: (row) => (
        <div className="mktcap-cell">
          <p>${formatNumber(row?.market_cap)}</p>
        </div>
      ),
    },
    {
      name: "24h Volume",
      selector: (row) => row?.total_volume,
      left: true,
      sortable: true,
      cell: (row) => (
        <div className="volume-cell">
          <p>${formatNumber(row?.total_volume)}</p>
        </div>
      ),
    },
    {
      name: "24h Change",
      selector: (row) => row?.price_change_percentage_24h,
      sortable: true,
      // only allowing 2 decimals after the period sign (.)
      cell: (row) =>
        typeof row.price_change_percentage_24h === "number"
          ? row.price_change_percentage_24h?.toFixed(2) + "%"
          : "?",
      conditionalCellStyles: [
        {
          when: (row) => row.price_change_percentage_24h < 0,
          style: {
            color: "red",
          },
        },
        {
          when: (row) => row.price_change_percentage_24h > 0,
          style: {
            color: "green",
          },
        },
      ],
    },
  ];
  const customStyles = {
    rows: {
      style: {
        fontSize: "18px",
        width: "100%",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        color: "black",
      },
    },
    cells: {
      style: {
        color: "black",
      },
    },
  };
  if (error) return <div>Failed to load, you are being rate limited.</div>;
  if (!data) return <div>loading...</div>;
  return (
    data.length > 0 && (
      <>
        <div className="coinlist">
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
          />
        </div>
        <div className="pagination">
          <Pagination
            count={100}
            page={parseFloat(page)}
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/${item?.page === 1 ? "" : `?pg=${item?.page}`}`}
                {...item}
              />
            )}
          />
        </div>
      </>
    )
  );
}

export default CoinRow;
