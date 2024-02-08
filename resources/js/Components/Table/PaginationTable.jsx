import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationTable = ({ table }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-end p-1 gap-2">
            <div className="flex items-center justify-center sm:justify-end mt-4 gap-2">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="p-1 border border-stroke px-2 hover:bg-gray dark:border-body dark:hover:bg-black dark:hover:bg-opacity-30 dark:disabled:hover:bg-transparent rounded-md disabled:hover:bg-transparent disabled:opacity-30"
                    >
                        <FiChevronLeft />
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="p-1 border border-stroke px-2 hover:bg-gray dark:border-body dark:hover:bg-black dark:hover:bg-opacity-30 dark:disabled:hover:bg-transparent rounded-md disabled:hover:bg-transparent disabled:opacity-30"
                    >
                        <FiChevronRight />
                    </button>
                </div>

                <span className="flex items-center gap-1 text-sm">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
            </div>
            <div className="flex items-center justify-center sm:justify-end mt-4 gap-2">
                <span className="flex items-center gap-1 text-sm">
                    Go to page:
                    <input
                        type="number"
                        min={1}
                        max={table.getPageCount()}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="w-16 p-1 border text-dark dark:text-white border-stroke bg-transparent rounded-lg transition-all duration-300 ease-in-out outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </span>
                <span className="flex items-center gap-1 text-sm">
                    Show:
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="py-1 pr-7 border text-dark dark:text-white border-stroke bg-transparent rounded-lg transition-all duration-300 ease-in-out outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        {[10, 20, 30, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </span>
            </div>
        </div>
    );
};

export default PaginationTable;
