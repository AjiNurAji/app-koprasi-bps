import { columnsPinjaman } from "@/Libs/tableStarted";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import SearchTable from "../Table/SearchTable";
import PaginationTable from "../Table/PaginationTable";
import ButtonTambahData from "../ButtonTambahData";

const TablePinjaman = ({ data, total }) => {
    const [datas] = useState([...data]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: datas,
        columns: columnsPinjaman,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            {/* head component */}
            <div className="flex items-start md:items-center justify-between mb-3.5">
                <ButtonTambahData url={route('pinjaman_transaksi')} />
                    <SearchTable
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                    />
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
                                            (item.index === 3 &&
                                                item.depth === 2) ||
                                            (item.index === 4 &&
                                                item.depth === 2) ||
                                            item.depth === 1
                                                ? ""
                                                : "hidden"
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
                                                        i === 0 || i === 4
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
                                        {total.sisa_pinjaman_tahun_lalu
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0"
                                              }).format(total.sisa_pinjaman_tahun_lalu)
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {total.total_pinjaman
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0"
                                              }).format(total.total_pinjaman)
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {total.total_dibayar
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0"
                                              }).format(total.total_dibayar)
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white">
                                        {total.sisa
                                            ? Intl.NumberFormat("en-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0"
                                              }).format(total.sisa)
                                            : "-"}
                                    </td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white"></td>
                                    <td className="font-medium text-right border py-5 px-4 border-stroke dark:border-opacity-20 text-black dark:text-white"></td>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-5 px-4 font-medium text-black dark:text-white"
                                >
                                    Belum ada data nihh!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <PaginationTable table={table} />
        </div>
    );
};

export default TablePinjaman;
