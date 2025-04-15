import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import Search from "@/components/atoms/search";
import { useSearchParams } from "next/navigation";
const Pagination = dynamic(() => import("./pagination/index"));

const DataTable = ({ columns, data }) => {
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || 10;
  const pageParams = searchParams.get("pageParams") || 1;

  // Konfigurasi tabel
  const table = useReactTable({
    columns,
    data: data.data,
    // state: {
    //   sorting,
    //   globalFilter: debouncedGlobalFilter,
    // },
    // onSortingChange: setSorting,
    // onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
    // getFacetedRowModel: getFacetedRowModel(),
    // initialState: {
    //   pagination: { pageSize: searchParams.get("limit") },
    //   columnVisibility: { id: false },
    // },
  });

  const visibleRows = table.getRowModel().rows;

  return (
    <div className="flow-root mt-2">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer ${
                          header.column.getCanSort() ? "hover:bg-gray-100" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "asc" ? (
                              <ArrowUpIcon className="w-5 h-5 ml-2 text-gray-500" />
                            ) : (
                              <ArrowDownIcon className="w-5 h-5 ml-2 text-gray-500" />
                            )
                          ) : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visibleRows.length > 0 ? (
                  visibleRows.map((row) => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) =>
                          cell.column.id == "actions" ? (
                            <td key={cell.id} className="w-1/12 px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ) : (
                            <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          )
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="w-1/12 px-6 py-4 text-sm text-center text-gray-900 whitespace-nowrap"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination
              rows={data.data.length}
              postsPerPage={10}
              currentPage={pageParams}
              totalRows={data.count}
              totalPages={Math.ceil(data.count / limit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
