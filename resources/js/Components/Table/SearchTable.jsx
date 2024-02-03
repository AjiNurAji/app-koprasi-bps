const SearchTable = ({globalFilter, setGlobalFilter}) => {
    return (
        <div className="relative">
            <input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Cari data"
                className="p-1 px-2 border text-dark dark:text-white border-stroke bg-transparent rounded-lg transition-all duration-300 ease-in-out outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default SearchTable;