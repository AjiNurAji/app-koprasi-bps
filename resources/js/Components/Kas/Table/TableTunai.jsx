import { columnKasTunai } from "@/Libs/tableStarted";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import PaginationTable from "@/Components/Table/PaginationTable";
import { HiArrowsUpDown } from "react-icons/hi2";
import SearchTable from "@/Components/Table/SearchTable";
import ButtonTambahData from "@/Components/ButtonTambahData";

const TableTunai = ({ data, bulan, saldo, user }) => {
    console.table(data)
    const [datas] = useState([...data]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: datas,
        columns: columnKasTunai,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    return (
        <div className="rounded-md mt-4 md:mt-6 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            {/* head component */}
            <div className="flex items-center justify-between mb-3.5">
                {user.role ? (
                    <ButtonTambahData url={route('kas_tunai_transaksi')} />
                ) : null}
                <div className="flex flex-col-reverse md:flex-row items-end md:items-center justify-end gap-3">
                    <SearchTable
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                    />
                </div>
            </div>
            {/* table */}
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto rounded-md">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="bg-gray-2 text-center dark:bg-meta-4"
                            >
                                {headerGroup.headers.map((item) => (
                                    <th
                                        key={item.id}
                                        className="relative py-4 px-4 font-medium text-black border dark:text-white border-stroke dark:border-opacity-20"
                                    >
                                        {flexRender(
                                            item.column.columnDef.header,
                                            item.getContext()
                                        )}
                                        {item.column.getCanSort() && (
                                            <button
                                                className="absolute top-5.5 text-md bottom-5 text-black dark:text-white dark:text-opacity-40 hover:text-primary dark:hover:text-opacity-100 text-opacity-40 right-3"
                                                onClick={item.column.getToggleSortingHandler()}
                                            >
                                                <HiArrowsUpDown />
                                            </button>
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
                                <tr className="bg-white dark:bg-meta-4 dark:bg-opacity-15">
                                    <td className="border py-5 px-4 border-stroke dark:border-opacity-20"></td>
                                    <td className="border py-5 px-4 font-semibold border-stroke dark:border-opacity-20">
                                        Jumlah
                                    </td>
                                    <td className="border py-5 px-4 font-semibold text-right border-stroke dark:border-opacity-20">
                                        {saldo.total_masuk
                                            ? Intl.NumberFormat("in-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0"
                                              }).format(saldo.total_masuk)
                                            : "-"}
                                    </td>
                                    <td className="border py-5 px-4 font-semibold text-right border-stroke dark:border-opacity-20">
                                        {saldo.total_keluar
                                            ? Intl.NumberFormat("in-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0"
                                              }).format(saldo.total_keluar)
                                            : "-"}
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-5 px-4"
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

export default TableTunai;
