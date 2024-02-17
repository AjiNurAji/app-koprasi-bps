import { GiCardPlay } from "react-icons/gi";
import DownloadDropdown from "../DownloadDrodown";
import { useRef, useState } from "react";
import CreatePopup from "../Popup/CreatePopup";
import { FaMoneyCheck } from "react-icons/fa";
import FormKasRekening from "../FormElements/FormKasRekening";

const CardRekening = ({ data, user, bulan, saldo }) => {
    const [datas, setDatas] = useState([...data]);
    const [popup, setPopup] = useState(false);
    const tableRef = useRef(null);

    return (
        <>
            {/* head component */}
            <div className="flex items-center justify-between mb-3.5">
                {user.role ? (
                    <button
                        className="p-3 hover:bg-opacity-95 transition-all duration-300 ease-in-out bg-primary text-white rounded-md text-xl"
                        onClick={() => setPopup(true)}
                    >
                        <GiCardPlay />
                    </button>
                ) : null}
                <div className="flex flex-col-reverse w-full md:flex-row items-end md:items-center justify-end gap-3">
                    {user.role ? (
                        <>
                            <DownloadDropdown
                                data={data}
                                filename="uangkastunai"
                                sheet="Uang Kas Tunai"
                                tableRef={tableRef}
                                // route={route('simpanan_pokok_pdf')}
                            />
                        </>
                    ) : null}
                </div>
            </div>
            {/* popup create */}
            {popup ? (
                <CreatePopup
                    createName="Kas Rekening"
                    setPopup={setPopup}
                    form={
                        <FormKasRekening
                            bulan={bulan}
                            saldo={saldo}
                            setPopup={setPopup}
                        />
                    }
                />
            ) : null}
            <div className="flex  gap-4 flex-col md:flex-row md:gap-6 flex-wrap">
                {data.length ? (
                    <>
                        {datas.map((value, i) => (
                            <div
                                className="overflow-hidden rounded-md w-full md:w-fit flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
                                key={i + 1}
                            >
                                {console.log(value.data)}
                                <div className="absolute text-[150px] text-primary text-opacity-20 bottom-0 -rotate-45 right-0 translate-x-8 translate-y-10">
                                    <FaMoneyCheck />
                                </div>
                                <div className="flex justify-start items-start flex-col w-full">
                                    <h3 className="font-bold text-title-md">
                                        {value.bulan}
                                    </h3>
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-2 items-start justify-start">
                                            <p>Setor</p>
                                            <p>Bunga Bank</p>
                                            <p>Pajak</p>
                                            <p>ADM</p>
                                            <p>Penarikan</p>
                                            <p className="font-bold">Saldo</p>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end font-semibold justify-start">
                                            <p>
                                                {Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(0)}{" "}
                                                <span className="ml-1 uppercase font-normal text-xs">
                                                    (DEBET)
                                                </span>
                                            </p>
                                            <p>
                                                {Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(0)}{" "}
                                                <span className="ml-1 uppercase font-normal text-xs">
                                                    (DEBET)
                                                </span>
                                            </p>
                                            <p>
                                                {Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(0)}{" "}
                                                <span className="ml-1 uppercase font-normal text-xs">
                                                    (DEBET)
                                                </span>
                                            </p>
                                            <p>
                                                {Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(0)}{" "}
                                                <span className="ml-1 uppercase font-normal text-xs">
                                                    (DEBET)
                                                </span>
                                            </p>
                                            <p>
                                                {Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(0)}{" "}
                                                <span className="ml-1 uppercase font-normal text-xs">
                                                    (DEBET)
                                                </span>
                                            </p>
                                            <p>
                                                {Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="flex justify-center items-center w-full rounded-md md:w-fit flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <p className="text-center">Belum ada data nihh!</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CardRekening;
