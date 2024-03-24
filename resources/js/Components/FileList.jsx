import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { columnFileList } from "@/Libs/tableStarted";
import SearchTable from "./Table/SearchTable";
import PaginationTable from "./Table/PaginationTable";
import ButtonFileList from "./ButtonFileList";
import { HiArrowsUpDown } from "react-icons/hi2";
import UploadFile from "./UploadFile";

const FileList = ({ data }) => {
    const [datas] = useState([...data]);
    const [popup, setPopup] = useState(false);
    const [type, setType] = useState("");
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: datas,
        columns: columnFileList,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            {/* head component */}
            <div className="flex flex-col gap-3 sm:flex-row items-center justify-between mb-3.5">
                <SearchTable
                    placeholder="Cari file"
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={globalFilter}
                />
                <ButtonFileList setPopup={setPopup} setType={setType} />
            </div>
            {/* create folder */}
            {popup && <UploadFile setPopup={setPopup} />}
            {/* table */}
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto rounded-md">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="text-left">
                                {headerGroup.headers.map((item,i) => (
                                    <th
                                        key={item.id}
                                        className={`py-2 px-4 font-medium text-black border-b dark:text-white border-stroke dark:border-opacity-20 ${(item.index >= 1 && item.index < 4) ? "max-sm:hidden" : ""}`}
                                    >
                                        <span className={(item.index >= 1 && item.index < 5) ? "max-sm:hidden" : ""}>
                                        {flexRender(
                                            item.column.columnDef.header,
                                            item.getContext()
                                        )}
                                        </span>
                                        {item.column.getCanSort() && (
                                            <button
                                                className="ml-2 text-md text-black dark:text-white dark:text-opacity-40 hover:text-primary dark:hover:text-opacity-100 text-opacity-40 right-3"
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
                            table.getRowModel().rows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={
                                        `${
                                            i % 2 === 0
                                            ? "bg-white hover:bg-stroke dark:hover:bg-strokedark dark:hover:bg-opacity-30 hover:bg-opacity-30 dark:bg-black dark:bg-opacity-15"
                                            : "bg-gray  hover:bg-stroke dark:hover:bg-strokedark dark:hover:bg-opacity-30 hover:bg-opacity-30 dark:bg-black bg-opacity-30 dark:bg-opacity-50"
                                        }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className={`border-b border-stroke dark:border-opacity-20 ${
                                                (!cell.id.includes("filename") && !cell.id.includes("_id")) && "max-sm:hidden"
                                            }`}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-b py-2 px-4 border-stroke dark:bg-meta-4 dark:border-opacity-20 text-center text-sm"
                                >
                                    Empety!
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

export default FileList;
