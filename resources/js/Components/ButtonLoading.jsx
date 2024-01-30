const ButtonLoading = ({ color }) => {
    return (
        <button
            disabled
            className={`w-full flex justify-center items-center rounded-lg border border-${color} bg-${color} p-2 bg-opacity-90`}
        >
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
        </button>
    );
};

export default ButtonLoading;