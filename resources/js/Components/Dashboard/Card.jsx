import { Link } from "@inertiajs/react";
import { RiArrowRightUpLine } from "react-icons/ri";

const Card = ({ icon, total, type, view, user }) => {
    return (
        <div className="rounded-md w-full md:w-fit flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full justify-start items-center gap-3">
                <div className="flex h-11.5 w-11.5 items-center text-2xl text-primary dark:text-white justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    {icon}
                </div>
                <h2>{type}</h2>
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(total ? total : 0)}
                    </h4>
                </div>
            </div>
            {view && user.role ? (
                <Link
                    href={view}
                    className="absolute top-0 right-4 hover:bg-boxdark-2 dark:hover:bg-whiten bg-boxdark dark:bg-white dark:text-boxdark py-0.5 -translate-y-1.5 px-2 rounded-full flex items-center gap-1 text-sm font-medium text-white"
                >
                    Lihat Data <RiArrowRightUpLine />
                </Link>
            ) : null}
        </div>
    );
};

export default Card;
