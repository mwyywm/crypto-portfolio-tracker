import React, { useEffect, useState } from "react";
import "./coinrow.css";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

function CoinRow() {
  const [coindata, setCoindata] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCoindata(data));
  }, []);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => <Link to={`/${row.id}`}>{row.name}</Link>,
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
      },
    },
    cells: {
      style: {},
    },
  };
  return (
    coindata.length > 0 && (
      <div className="coinlist">
        <DataTable
          columns={columns}
          data={coindata}
          customStyles={customStyles}
        />
      </div>
    )
  );
}

export default CoinRow;
