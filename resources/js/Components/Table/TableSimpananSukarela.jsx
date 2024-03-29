import { columnsSimpananSukarela } from "@/Libs/tableStarted";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import PaginationTable from "./PaginationTable";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import SearchTable from "./SearchTable";

const TableSimpananSukarela = ({ data, total }) => {
    const [datas] = useState([...data]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: datas,
        columns: columnsSimpananSukarela,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            {/* head component */}
            <div className="flex items-start md:items-center justify-between mb-3.5">
                <a
                    className="p-3 hover:bg-opacity-95 transition-all duration-300 ease-in-out bg-primary text-white rounded-md text-xl"
                    href={route("sukarela_transaction")}
                >
                    <FaMoneyBillTransfer />
                </a>
                <div className="flex flex-col-reverse md:flex-row items-end md:items-center justify-end gap-3">
                    <SearchTable
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                    />
                </div>
            </div>
            {/* table */}
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto rounded-md border border-stroke">
                    <thead className="rounded-md">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="bg-gray-2 text-left dark:bg-meta-4 rounded-md"
                            >
                                {headerGroup.headers.map((item) => (
                                    <th
                                        key={item.id}
                                        colSpan={item.colSpan}
                                        rowSpan={
                                            (item.index === 0 &&
                                                item.depth === 1) ||
                                            (item.index === 1 &&
                                                item.depth === 1) ||
                                            (item.index === 2 &&
                                                item.depth === 1) ||
                                            (item.index === 3 &&
                                                item.depth === 1)
                                                ? "2"
                                                : ""
                                        }
                                        className={`${
                                            (item.index === 0 &&
                                                item.depth === 2) ||
                                            (item.index === 1 &&
                                                item.depth === 2) ||
                                            (item.index === 2 &&
                                                item.depth === 2) ||
                                            (item.index === 3 &&
                                                item.depth === 2)
                                                ? "hidden"
                                                : ""
                                        } py-4 px-4 font-medium border border-stroke dark:border-opacity-20 text-black dark:text-white text-center`}
                                    >
                                        {flexRender(
                                            item.column.columnDef.header,
                                            item.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length ? (
                            <>
                                {table.getRowModel().rows.map((row, i) => (
                                    <tr
                                        key={row.id}
                                        className={`${
                                            i % 2 === 0
                                                ? "bg-white dark:bg-meta-4 dark:bg-opacity-15"
                                                : "bg-gray dark:bg-meta-4 bg-opacity-30 dark:bg-opacity-30"
                                        }`}
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell, i) => (
                                                <td
                                                    key={cell.id}
                                                    className={`${
                                                        i === 0
                                                            ? "text-center"
                                                            : i === 1
                                                            ? "text-left"
                                                            : "text-right"
                                                    } border py-5 px-4 border-stroke dark:border-opacity-20`}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                ))}
                                <tr>
                                    <td
                                        className="font-medium text-center border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white"
                                        colSpan={2}
                                    >
                                        TOTAL
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {data
                                            .map((r) => r.sukarela)
                                            .reduce((p, c) => p + c, 0)
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(
                                                  data
                                                      .map((r) => r.sukarela)
                                                      .reduce(
                                                          (p, c) => p + c,
                                                          0
                                                      )
                                              )
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {data
                                            .map((r) => r.shu)
                                            .reduce((p, c) => p + c, 0)
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(
                                                  data
                                                      .map((r) => r.shu)
                                                      .reduce(
                                                          (p, c) => p + c,
                                                          0
                                                      )
                                              )
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {data
                                            .map((r) => r.awal_tahun)
                                            .reduce((p, c) => p + c, 0)
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(
                                                  data
                                                      .map((r) => r.awal_tahun)
                                                      .reduce(
                                                          (p, c) => p + c,
                                                          0
                                                      )
                                              )
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {total.total_selama_tahun
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(
                                                  total.total_selama_tahun
                                              )
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {total.total_diambil
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(total.total_diambil)
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {total.total_disimpan_kembali
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(
                                                  total.total_disimpan_kembali
                                              )
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {data
                                            .map((r) => r.akhir_tahun)
                                            .reduce((p, c) => p + c, 0)
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(
                                                  data
                                                      .map((r) => r.akhir_tahun)
                                                      .reduce(
                                                          (p, c) => p + c,
                                                          0
                                                      )
                                              )
                                            : "-"}
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="text-center py-5 px-4 font-medium text-black dark:text-white"
                                >
                                    Belum ada data nihh!
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
            {/* pagination */}
            <PaginationTable table={table} />
        </div>
    );
};

export default TableSimpananSukarela;
