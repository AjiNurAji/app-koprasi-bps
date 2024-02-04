const Loader = () => {
    return (
        <div className="absolute w-full z-9999 flex h-screen items-center justify-center bg-white" id="loader">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
};

export default Loader;
