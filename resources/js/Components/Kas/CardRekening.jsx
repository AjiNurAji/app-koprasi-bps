import { GiCardPlay } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa";

const CardRekening = ({ data, user }) => {
    return (
        <>
            {/* head component */}
            <div className="flex items-center justify-between mb-3.5">
                {user.role ? (
                    <a
                        className="p-3 hover:bg-opacity-95 transition-all duration-300 ease-in-out bg-primary text-white rounded-md text-xl"
                        href={route("kas_rekening_transaksi")}
                    >
                        <GiCardPlay />
                    </a>
                ) : null}
            </div>
            <div className="flex  gap-4 flex-col md:flex-row md:gap-6 flex-wrap">
                {data.length ? (
                    <>
                        {data.map((value, i) => (
                            <div
                                className="overflow-hidden rounded-md w-full md:w-fit flex-auto relative border border-stroke text-black dark:text-white bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
                                key={i + 1}
                            >
                                <div className="absolute text-[150px] text-stroke dark:text-strokedark z-1 bottom-0 -rotate-45 right-0 translate-x-8 translate-y-10">
                                    <FaMoneyCheck />
                                </div>
                                <div className="flex relative z-9 justify-start items-start flex-col w-full">
                                    <h3 className="font-bold text-title-md text-black dark:text-primary">
                                        {value.bulan}
                                    </h3>
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-2 items-start justify-start">
                                            <p>Setor</p>
                                            <p>Bunga Bank</p>
                                            <p>Pajak</p>
                                            <p>ADM</p>
                                            <p>Penarikan</p>
                                            <p className="font-bold text-black dark:text-white">
                                                Saldo
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end font-semibold justify-start">
                                            <p>
                                                {value.setor
                                                    ? Intl.NumberFormat(
                                                          "in-ID",
                                                          {
                                                              style: "currency",
                                                              currency: "IDR",
                                                              maximumFractionDigits: "0"
                                                          }
                                                      ).format(value.setor)
                                                    : "-"}{" "}
                                                {value.setor_type ? (
                                                    <span className="ml-1 uppercase font-normal text-xs dark:text-white text-black dark:text-opacity-40">
                                                        ({value.setor_type})
                                                    </span>
                                                ) : null}
                                            </p>
                                            <p>
                                                {value.bunga_bank
                                                    ? Intl.NumberFormat(
                                                          "in-ID",
                                                          {
                                                              style: "currency",
                                                              currency: "IDR",
                                                              maximumFractionDigits: "0"
                                                          }
                                                      ).format(value.bunga_bank)
                                                    : "-"}{" "}
                                                {value.bunga_bank_type ? (
                                                    <span className="ml-1 uppercase font-normal text-xs dark:text-white text-black dark:text-opacity-40">
                                                        ({value.bunga_bank_type}
                                                        )
                                                    </span>
                                                ) : null}
                                            </p>
                                            <p>
                                                {value.pajak
                                                    ? Intl.NumberFormat(
                                                          "in-ID",
                                                          {
                                                              style: "currency",
                                                              currency: "IDR",
                                                              maximumFractionDigits: "0"
                                                          }
                                                      ).format(value.pajak)
                                                    : "-"}{" "}
                                                {value.pajak_type ? (
                                                    <span className="ml-1 uppercase font-normal text-xs dark:text-white text-black dark:text-opacity-40">
                                                        ({value.pajak_type})
                                                    </span>
                                                ) : null}
                                            </p>
                                            <p>
                                                {value.adm
                                                    ? Intl.NumberFormat(
                                                          "in-ID",
                                                          {
                                                              style: "currency",
                                                              currency: "IDR",
                                                              maximumFractionDigits: "0"
                                                          }
                                                      ).format(value.adm)
                                                    : "-"}{" "}
                                                {value.adm_type ? (
                                                    <span className="ml-1 uppercase font-normal text-xs dark:text-white text-black dark:text-opacity-40">
                                                        ({value.adm_type})
                                                    </span>
                                                ) : null}
                                            </p>
                                            <p>
                                                {value.penarikan
                                                    ? Intl.NumberFormat(
                                                          "in-ID",
                                                          {
                                                              style: "currency",
                                                              currency: "IDR",
                                                              maximumFractionDigits: "0"
                                                          }
                                                      ).format(value.penarikan)
                                                    : "-"}{" "}
                                                {value.penarikan_type ? (
                                                    <span className="ml-1 uppercase font-normal text-xs dark:text-white text-black dark:text-opacity-40">
                                                        ({value.penarikan_type})
                                                    </span>
                                                ) : null}
                                            </p>
                                            <p className="text-black dark:text-white">
                                                {value.saldo
                                                    ? Intl.NumberFormat(
                                                          "in-ID",
                                                          {
                                                              style: "currency",
                                                              currency: "IDR",
                                                              maximumFractionDigits: "0"
                                                          }
                                                      ).format(value.saldo)
                                                    : "-"}
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
