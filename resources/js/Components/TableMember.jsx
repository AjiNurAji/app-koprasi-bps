import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { paginationComponentOptions, tableHeader } from "@/Libs/tableHeader";
import { AiOutlineClear } from "react-icons/ai";
import { LuUserPlus } from "react-icons/lu";

const TableMember = ({ data }) => {
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        (item) =>
            item.name &&
            item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <div className="flex w-full justify-between items-center">
                <a href="member/create" className="flex justify-center items-center cursor-pointer rounded-lg border border-primary bg-primary h-10 w-15 text-xl text-white transition hover:bg-opacity-90"><LuUserPlus /></a>
                <div className="flex relative justify-end items-center gap-3">
                    <input
                        type="text"
                        className="relative w-full rounded-lg border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        onChange={(e) => setFilterText(e.target.value)}
                        value={filterText}
                        placeholder="Cari nama"
                    />
                    <button
                        className="absolute top-3.5 right-4 cursor-pointer text-body hover:text-primary dark:hover:text-white"
                        onClick={handleClear}
                    >
                        <AiOutlineClear />
                    </button>
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <DataTable
                data={filteredItems}
                columns={tableHeader}
                responsive={true}
                pagination={true}
                striped={true}
                pointerOnHover={true}
                highlightOnHover={true}
                fixedHeader={true}
                fixedHeaderScrollHeight="650px"
                paginationComponentOptions={paginationComponentOptions}
                paginationResetDefaultPage={resetPaginationToggle}
                noDataComponent={
                    <div className="py-5 px-4">
                        <p className="text-black dark:text-white text-center">
                            Data belum tersedia.
                        </p>
                    </div>
                }
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
            />
        </div>
    );
};

export default TableMember;
