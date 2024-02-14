import { useRef, useState } from "react";
import PaginationTable from "./PaginationTable";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel
} from "@tanstack/react-table";
import { HistoryOptionTable } from "@/Libs/tableStarted";
import SearchTable from "./SearchTable";
import DownloadDropdown from "../DownloadDrodown";
import { HiArrowsUpDown } from "react-icons/hi2";

const TableHistory = ({ data }) => {
    const [datas] = useState([...data]);
    const [globalFilter, setGlobalFilter] = useState("");
    const tableRef = useRef(null);

    const table = useReactTable({
        data: datas,
        columns: HistoryOptionTable,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            {/* head component */}
            <div className="flex items-start flex-row-reverse md:items-center justify-between mb-3.5">
                <DownloadDropdown
                    data={datas}
                    filename="historytransaksi"
                    sheet="historytransaksi"
                    tableRef={tableRef}
                />
                <div className="flex flex-col-reverse md:flex-row items-end md:items-center justify-end gap-3">
                    <SearchTable
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                    />
                </div>
            </div>
            {/* table */}
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto rounded-md border border-stroke" ref={tableRef}>
                    <thead className="rounded-md">
                        <tr className="hidden">
                            <th colSpan={7} style={{ textAlign: "center" }}>
                                History Transaksi {new Date().getFullYear()} <br /> <br /> <br />
                            </th>
                        </tr>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="bg-gray-2 text-left dark:bg-meta-4"
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
                                            <button className="absolute top-5.5 text-md bottom-5 text-black dark:text-white dark:text-opacity-40 hover:text-primary dark:hover:text-opacity-100 text-opacity-40 right-3" onClick={item.column.getToggleSortingHandler()}>
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
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="border py-5 px-4 border-stroke dark:border-opacity-20"
                                            >
                                                {console.log(cell)}
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
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

export default TableHistory;
