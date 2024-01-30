import { useEffect } from "react";

const PaginationButton = ({ range, setPage, page, slice }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);
    return (
        <div className="flex justify-center items-center gap-2 py-3">
            {page === 1 ? (
                <button disabled className="opacity-50">
                    Prev
                </button>
            ) : (
                <button onClick={() => setPage(page - 1)}>Prev</button>
            )}
            {range.map((item, index) => (
                <button
                    key={index}
                    className={`rounded-md w-5 h-5 flex justify-center items-center ${
                        page === item
                            ? "bg-primary text-white"
                            : "text-black bg-bodydark dark:text-white dark:bg-black"
                    }`}
                    onClick={() => setPage(item)}
                >
                    {item}
                </button>
            ))}
            {range.length === page ? (
                <button disabled className="opacity-50">
                    Next
                </button>
            ) : (
                <button onClick={() => setPage(page + 1)}>Next</button>
            )}
        </div>
    );
};

export default PaginationButton;
