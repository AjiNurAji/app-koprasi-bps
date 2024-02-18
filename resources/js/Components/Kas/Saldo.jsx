import { BsCreditCard2Front, BsWallet } from "react-icons/bs";

const Saldo = ({ saldoAwal, saldo, setPopup }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-md w-full flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex w-full justify-start items-center gap-3">
                    <div className="flex h-11.5 w-11.5 items-center text-2xl text-primary justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                        <BsWallet />
                    </div>
                    <h2 className="font-bold text-lg text-black dark:text-white">Saldo Awal</h2>
                </div>

                {saldoAwal ? null : (
                    <button onClick={() => setPopup(true)} className="absolute bg-primary px-2 py-1 rounded-md text-white text-xs top-3 right-3">
                        Set Saldo Awal
                    </button>
                )}

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold text-black dark:text-white">
                            {Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(saldoAwal ? saldoAwal : 0)}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="rounded-md w-full flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex w-full justify-start items-center gap-3">
                    <div className="flex h-11.5 w-11.5 items-center text-2xl text-primary justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                        <BsCreditCard2Front />
                    </div>
                    <h2 className="font-bold text-lg text-black dark:text-white">Saldo</h2>
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold text-black dark:text-white">
                            {Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(saldo ? saldo : 0)}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Saldo;
