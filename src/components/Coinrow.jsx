import React, { useEffect, useState } from "react";
import "./coinrow.css";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

function CoinRow() {
  const { data, error } = useSWR(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    fetcher
  );

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => <Link to={`/coin/${row.id}`}>{row.name}</Link>,
    },
    {
      name: "Price",
      selector: "current_price",
      sortable: true,
      // no formating because we need a very accurate number
      cell: (row) => `${row.current_price}`,
    },
    {
      name: "Market Cap",
      selector: "market_cap",
      sortable: true,
      className: "wow",
      cell: (row) => `${new Intl.NumberFormat().format(row.market_cap)}`,
    },
    {
      name: "24h Volume",
      selector: "total_volume",
      sortable: true,
      cell: (row) => `${new Intl.NumberFormat().format(row.total_volume)}`,
    },
    {
      name: "24h Change",
      selector: "price_change_percentage_24h",
      sortable: true,
      // only allowing 2 decimals after the period sign (.)
      cell: (row) => `${row.price_change_percentage_24h.toFixed(2)}%`,
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
  if (error) return <div>failed to load data.</div>;
  if (!data) return <div>loading...</div>;
  return (
    data.length > 0 && (
      <div className="coinlist">
        <DataTable columns={columns} data={data} customStyles={customStyles} />
      </div>
    )
  );
}

export default CoinRow;
