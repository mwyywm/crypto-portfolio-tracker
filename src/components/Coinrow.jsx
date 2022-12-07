import * as React from "react";
import useSWR, { useSWRConfig } from "swr";
import "./coinrow.css";

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
  const [sorting, setSorting] = React.useState([
    { desc: true, id: "market_cap" },
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
          <a href={`/coin/${props.row.original.id}`}>{props.getValue()}</a>
        ),
      }),
      columnHelper.accessor("current_price", {
        header: () => <span>Price</span>,
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor("market_cap", {
        header: () => <span>Market cap</span>,
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor("total_volume", {
        header: () => <span>24h volume</span>,
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor("price_change_percentage_24h", {
        header: "24h Change",
        cell: (props) => props.getValue(),
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
    enableSorting: true,
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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
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
