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
import { GiCardPlay } from "react-icons/gi";
import { HiArrowsUpDown } from "react-icons/hi2";
import SearchTable from "@/Components/Table/SearchTable";
import CreatePopup from "@/Components/Popup/CreatePopup";
import FormKasTunai from "@/Components/FormElements/FormKasTunai";
import DownloadDropdown from "@/Components/DownloadDrodown";

const TableTunai = ({ data, bulan, saldo, user }) => {
    const [datas] = useState([...data]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [popup, setPopup] = useState(false);

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
                    <button
                        className="p-3 hover:bg-opacity-95 transition-all duration-300 ease-in-out bg-primary text-white rounded-md text-xl"
                        onClick={() => setPopup(true)}
                    >
                        <GiCardPlay />
                    </button>
                ) : null}
                <div className="flex flex-col-reverse w-full md:flex-row items-end md:items-center justify-end gap-3">
                    {user.role ? (
                        <DownloadDropdown
                            pdf="kastunai.pdf"
                            csv="kastunai.csv"
                            excel="kastunai.xlsx"
                            routepdf={route("kas_tunai_pdf")}
                            routecsv={route("kas_tunai_csv")}
                            routeexcel={route("kas_tunai_excel")}
                        />
                    ) : null}
                    <SearchTable
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                    />
                </div>
            </div>
            {/* popup create */}
            {popup ? (
                <CreatePopup
                    createName="Kas Tunai"
                    setPopup={setPopup}
                    form={
                        <FormKasTunai
                            bulan={bulan}
                            saldo={saldo}
                            setPopup={setPopup}
                        />
                    }
                />
            ) : null}
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
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="border py-5 px-4 border-stroke dark:border-opacity-20"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
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
                                    <td className="border py-5 px-4 font-semibold border-stroke dark:border-opacity-20">
                                        {Intl.NumberFormat("in-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(
                                            saldo.total_masuk
                                                ? saldo.total_masuk
                                                : 0
                                        )}
                                    </td>
                                    <td className="border py-5 px-4 font-semibold border-stroke dark:border-opacity-20">
                                        {Intl.NumberFormat("in-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(
                                            saldo.total_keluar
                                                ? saldo.total_keluar
                                                : 0
                                        )}
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
