import * as React from "react";
import useSWR, { useSWRConfig } from "swr";
import "./coinrow.css";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
// const defaultData = [
//   {
//     name: "Bitcoin",
//     price: "linsley",
//     market_cap: 24,
//     volume: 100000,
//     change: 2,
//   },
//   {
//     name: "tandy",
//     price: "miller",
//     market_cap: 40,
//     volume: 100000,
//     change: 2,
//   },
//   {
//     name: "joe",
//     price: "dirte",
//     market_cap: 45,
//     volume: 100000,
//     change: 2,
//   },
// ];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: () => <span>Name</span>,
    cell: (info) => (
      <a href={`/coin/${info.row.original.id}`}>{info.getValue()}</a>
    ),
  }),
  columnHelper.accessor("current_price", {
    header: () => <span>Price</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("market_cap", {
    header: () => <span>Market cap</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("total_volume", {
    header: () => <span>24h volume</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price_change_percentage_24h", {
    header: "24h Change",
    cell: (info) => info.getValue(),
  }),
];

export default function Coinrow() {
  const [page, setPage] = React.useState(1);
  const { data, error, isValidating } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`,
    {
      revalidateOnFocus: false,
      onSuccess: (res) => {
        let arr = [];
        res.map((coin) => {
          arr.push(coin);
        });
      },
    }
  );
  const rerenderDebug = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data: data,
    columns,
    state: {
      columnVisibility: {
        id: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
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
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <button onClick={() => rerenderDebug()}>Rerender 4 debugging</button>
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
