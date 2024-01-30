import { BiEdit } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import useTable from "@/hook/useTable";
import PaginationButton from "./PaginationButton";

const TableMember = ({ data }) => {
    const tableEl = useRef(null);
    const rowsSet = useRef(null);
    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto sm:overflow-x-visible">
                <div className="flex w-full justify-between items-center py-2">
                    <select
                        ref={rowsSet}
                        onChange={(e) =>
                            setRowPerPage(Number(e.target.value))
                        }
                        name="range"
                        id="range"
                        className="rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>

                    <div className="flex justify-center items-center gap-3">
                        <input
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama"
                            className="rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
                <table
                    className="w-full table-auto"
                    id="tableMember"
                    ref={tableEl}
                >
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                No
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Nama
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Email
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length !== 0 ? (
                            <>
                                {search === "" ? (
                                    <>
                                        {slice?.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 w-auto">
                                                        <h5 className="font-medium text-black dark:text-white">
                                                            {data.id_member}
                                                        </h5>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p className="text-black dark:text-white">
                                                            {data.name}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p className="text-black dark:text-white">
                                                            {data.email}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <div className="flex items-center space-x-3.5">
                                                            <button className="hover:text-primary text-lg">
                                                                <BiEdit />
                                                            </button>
                                                            <button className="hover:text-meta-1 text-lg">
                                                                <BsTrash3 />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <>
                                        {data
                                            ?.filter((items) => {
                                                const name =
                                                    search.toLowerCase();
                                                return name === ""
                                                    ? items
                                                    : items.name
                                                          .toLowerCase()
                                                          .includes(name);
                                            })
                                            .map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 w-auto">
                                                            <h5 className="font-medium text-black dark:text-white">
                                                                {data.id_member}
                                                            </h5>
                                                        </td>
                                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                            <p className="text-black dark:text-white">
                                                                {data.name}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                            <p className="text-black dark:text-white">
                                                                {data.email}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                            <div className="flex items-center space-x-3.5">
                                                                <button className="hover:text-primary text-lg">
                                                                    <BiEdit />
                                                                </button>
                                                                <button className="hover:text-meta-1 text-lg">
                                                                    <BsTrash3 />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </>
                                )}
                            </>
                        ) : (
                            <tr>
                                <td
                                    className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                                    colSpan={4}
                                >
                                    <p className="text-black dark:text-white text-center">
                                        Belum ada data nihh 😊
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {search === "" ? (
                    <PaginationButton
                        range={range}
                        slice={slice}
                        setPage={setPage}
                        page={page}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default TableMember;
