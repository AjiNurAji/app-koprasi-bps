import { useForm } from "@inertiajs/react";
import ButtonLoading from "./ButtonLoading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const Rekap = ({ route, redirect, title }) => {
    const [processing, setPorcess] = useState(false);
    const [result, setResult] = useState([]);
    const { data, setData } = useForm({
        start_date: "",
        end_date: "",
    });

    const rekap = async (e) => {
        e.preventDefault();
        if (!data.start_date || !data.end_date)
            return toast.error("Harap pilih tanggal!");

        setPorcess(true);
        const loading = toast.loading("Loading...");

        const response = await axios.post(route, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        if (response.data) {
            setResult(response.data.result);

            toast.success(response.data.message, {
                id: loading,
                duration: 3000,
            });

            setPorcess(false);
        }

        setPorcess(false);
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
            <div className="w-full mt-4 flex justify-end items-center">
                {processing ? (
                    <ButtonLoading color="primary" />
                ) : (
                    <button
                        type="button"
                        name="button-sumbit"
                        onClick={rekap}
                        className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                    >
                        Rekap
                    </button>
                )}
            </div>
        </div>
    );
};

export default Rekap;
