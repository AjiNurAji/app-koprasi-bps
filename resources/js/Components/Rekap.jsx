import { useForm } from "@inertiajs/react";
import ButtonLoading from "./ButtonLoading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { SiMicrosoftexcel } from "react-icons/si";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";
import JsFileDownloader from "js-file-downloader";

const Rekap = ({ excel, pdf, csv, title, filename }) => {
    const [processingExcel, setProcessExcel] = useState(false);
    const [processingPDF, setProcessPDF] = useState(false);
    const [processingCSV, setProcessCSV] = useState(false);
    const [result, setResult] = useState([]);
    const { data, setData } = useForm({
        start_date: "",
        end_date: "",
    });

    const rekap = async (e, route, exc) => {
        e.preventDefault();
        if (!data.start_date || !data.end_date)
            return toast.error("Harap pilih tanggal!", { className: "dark:bg-boxdark dark:text-white" });

        const loading = toast.loading("Loading...", { className: "dark:bg-boxdark dark:text-white" });

        if (exc === ".xlsx") {
            setProcessExcel(true);
        } else if (exc === ".pdf") {
            setProcessPDF(true);
        } else if (exc === ".csv") {
            setProcessCSV(true);
        }

        const response = await axios.post(route, data, {
            responseType: "arraybuffer",
        });

        const nameFile =
            filename + " " + new Date(data.end_date).getFullYear() + exc;

        const url = window.URL.createObjectURL(new Blob([response.data]));

        new JsFileDownloader({ url: url, filename: nameFile })
            .then(() => {
                toast.success("File berhasil didownload", {
                    id: loading,
                    duration: 3000,
                    className: "dark:bg-boxdark dark:text-white"
                });
                setProcessCSV(false);
                setProcessExcel(false);
                setProcessPDF(false);
            })
            .catch(() => {
                toast.error("Terjadi kesalahan saat mendownload file!", {
                    id: loading,
                    duration: 3000,
                    className: "dark:bg-boxdark dark:text-white"
                });
                setProcessCSV(false);
                setProcessExcel(false);
                setProcessPDF(false);
            });
    };

    return (
        <div className="rounded-md border mb-4 sm:mb-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h2 className="font-bold text-2xl text-black mb-3">
                Rekap {title}
            </h2>
            <div className="w-full">
                <label
                    htmlFor="start_date"
                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                >
                    Dari Tanggal
                </label>
                <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    value={data.start_date}
                    onChange={(e) => {
                        setData({
                            ...data,
                            start_date: e.target.value,
                        });
                    }}
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div className="w-full mt-4">
                <label
                    htmlFor="end_date"
                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                >
                    Sampai Tanggal
                </label>
                <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    value={data.end_date}
                    onChange={(e) => {
                        setData({
                            ...data,
                            end_date: e.target.value,
                        });
                    }}
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div className="w-full mt-4 gap-4 flex-wrap sm:flex-nowrap flex justify-end items-center">
                {processingExcel ? (
                    <ButtonLoading color="success" />
                ) : (
                    <button
                        type="button"
                        name="download-excel"
                        onClick={(e) => rekap(e, excel, ".xlsx")}
                        className="w-full flex items-center py-2 px-1 justify-center gap-2 text-sm cursor-pointer rounded-md border border-success bg-success p-2 text-white transition hover:bg-opacity-90"
                    >
                        <SiMicrosoftexcel className="w-6 h-6" /> Excel
                    </button>
                )}
                {processingPDF ? (
                    <ButtonLoading color="danger" />
                ) : (
                    <button
                        type="button"
                        name="button-sumbit"
                        onClick={(e) => rekap(e, pdf, ".pdf")}
                        className="w-full flex items-center py-2 px-1 justify-center gap-2 text-sm cursor-pointer rounded-md border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90"
                    >
                        <FaRegFilePdf className="w-6 h-6" /> PDF
                    </button>
                )}
                {processingCSV ? (
                    <ButtonLoading color="primary" />
                ) : (
                    <button
                        type="button"
                        name="button-sumbit"
                        onClick={(e) => rekap(e, csv, ".csv")}
                        className="w-full flex items-center py-2 px-1 justify-center gap-2 text-sm cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                    >
                        <BsFiletypeCsv className="w-6 h-6" /> CSV
                    </button>
                )}
            </div>
        </div>
    );
};

export default Rekap;
