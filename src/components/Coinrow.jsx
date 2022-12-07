import * as React from "react";
import useSWR, { useSWRConfig } from "swr";
import "./coinrow.css";
import formatNumber from "../utils/formatNumber";

function ArrowDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path fill="#2E3A59" d="M10 12.083l4.167-4.166H5.833L10 12.083z"></path>
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path fill="#2E3A59" d="M10 7.917l-4.167 4.166h8.334L10 7.917z"></path>
    </svg>
  );
}

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function Coinrow() {
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = React.useState([]);
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
        header: () => <span>24 Change</span>,
        invertSorting: true,
        cell: (props) => (
          <div
            className="price-cell"
            style={{ color: props.getValue() > 0 ? "green" : "red" }}
          >
            {typeof props.getValue() === "number" &&
              props.getValue().toFixed(2)}
            %
          </div>
        ),
      }),
    ],
    []
  );

  const rerenderDebug = React.useReducer(() => ({}), {})[1];

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
    debugTable: true,
  });

  if (isValidating || !data) {
    return <div>loading</div>;
  }
  if (error)
    return (
      <div>
        <h1>404</h1>
        <p>Loading failed...</p>
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
                          {console.log("h", header.column)}
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
      {/* <button onClick={() => rerenderDebug()}>Rerender 4 debugging</button> */}
      <button
        onClick={() =>
          setPage((prev) => {
            return prev === 0 ? 0 : prev - 1;
          })
        }
      >
        prev page
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>next page</button>
    </div>
  );
}
