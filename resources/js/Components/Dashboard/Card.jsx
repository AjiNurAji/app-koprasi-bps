const Card = ({ icon, total, type }) => {
    // const format =

    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center text-2xl text-primary dark:text-white justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                {icon}
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(total ? total : 0)}
                    </h4>
                    <span className="text-sm font-medium">Total {type}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
