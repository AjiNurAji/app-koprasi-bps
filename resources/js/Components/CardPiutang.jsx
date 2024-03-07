import { BiUser } from "react-icons/bi";

const CardPiutang = ({ data }) => {
    return (
        <div className="rounded-md mb-4 md:mb-6 w-full flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full justify-start items-center gap-3">
                <div className="flex h-11.5 w-11.5 items-center text-2xl text-primary dark:text-white justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <BiUser />
                </div>
                <h2 className="font-bold text-lg">Jasa Pituang Anggota</h2>
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {data ? data.persentase : 0}%
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default CardPiutang;