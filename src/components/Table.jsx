import * as React from "react";
import useSWR from "swr";
import "./table.css";
import formatNumber from "../utils/formatNumber";
import { ArrowDown, ArrowUp } from "../images/Arrow";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Skeleton from "./Skeleton";

const columnHelper = createColumnHelper();

export default function Coinrow({ page }) {
  const [sorting, setSorting] = React.useState([
    { desc: false, id: "market_cap" },
  ]);
  const { data, error, isValidating } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`,
    {
      revalidateOnFocus: false,
    }
  );
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => <span>Name</span>,
        cell: (props) => (
          <a href={`/coin/${props.row.original.id}`} className="name-cell">
            {props.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("current_price", {
        header: () => <span>Price</span>,
        invertSorting: true,
        cell: (props) => (
          <div className="price-cell">${formatNumber(props.getValue())}</div>
        ),
      }),
      columnHelper.accessor("market_cap", {
        header: () => <span>Market cap</span>,
        invertSorting: true,
        cell: (props) => (
          <div className="mktcap-cell">${formatNumber(props.getValue())}</div>
        ),
      }),
      columnHelper.accessor("total_volume", {
        header: () => <span>24h volume</span>,
        invertSorting: true,
        cell: (props) => (
          <div className="volume-cell">${formatNumber(props.getValue())}</div>
        ),
      }),
      columnHelper.accessor("price_change_percentage_24h", {
        header: () => <span>24h Change</span>,
        invertSorting: true,
        cell: (props) => (
          <div
            className="price-cell"
            style={{
              color:
                typeof props.getValue() === "number" && props.getValue() > 0
                  ? "green"
                  : typeof props.getValue() === "number" && props.getValue() < 0
                  ? "red"
                  : "white",
            }}
          >
            {typeof props.getValue() === "number" &&
              `${props.getValue().toFixed(2)}%`}
            {typeof props.getValue() !== "number" && `?`}
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    sortDescFirst: false,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isValidating || !data) {
    return (
      <div className="coinlist">
        <Skeleton height={"100vh"} />
      </div>
    );
  }
  if (error)
    return (
      <div>
        <h1>404</h1>
      </div>
    );

  return (
    <div className="coinlist">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="header-cell"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="heading-div">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <p className="heading-arrow">
                          {
                            {
                              desc: <ArrowUp />,
                              asc: <ArrowDown />,
                            }[header.column.getIsSorted()]
                          }
                        </p>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
