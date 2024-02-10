import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoading from "../ButtonLoading";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PostData from "@/Libs/postData";
import SelectWithSearch from "./SelectWithSearch";
import NextSimpananPokok from "./NextStepSimpananPokok";
import axios from "axios";

const FormSimpanan = ({ members, setPopup }) => {
    const [processing, setProcess] = useState(false);
    const [simpanan, setSimpanan] = useState([]);
    const getTahun = new Date();
    const form = useRef(null);
    const [step, setStep] = useState(1);
    const { data, setData } = useForm({
        name: "",
        id_member: "",
        tahun: getTahun.getFullYear(),
        bulan: getTahun.toLocaleDateString("id-ID", { month: "long" }),
        hari: getTahun.toLocaleDateString("id-ID", { weekday: "long" }),
        awal_tahun: undefined,
        anggota_masuk: undefined,
        anggota_keluar: undefined,
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const create = await PostData(route("simpanan_pokok_create"), data);

        if (create) {
            form.current.reset();
            setPopup(false);
            setProcess(false);
            router.get(route("simpanan_pokok"));
        }

        setProcess(false);
    };

    // useEffect(async () => {
    // }, [step]);
    const handleStep = async (e) => {
        e.preventDefault();
        setProcess(true);
        const toastLoading = toast.loading("Loading...");

        try {
            const response = await axios.post(route("simpanan_pokok"), data, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (response.data) {
                toast.success(response.data.message, {
                    id: toastLoading,
                    duration: 3000,
                });
                setSimpanan(response.data.simpananPokok);
                setProcess(false);
                return setStep(2);
            }
            
            toast.error(response.message, {
                id: toastLoading,
                duration: 3000,
            });
            setProcess(false);
            return setStep(1);
        } catch (error) {
            setProcess(false);
            toast.error(error.response.data.message, {
                id: toastLoading,
                duration: 3000,
            });
        }
    };

    const handleNominal = (v, n) => {
        setData({
            ...data,
            [n]: Number(v),
        });
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={submit}
            ref={form}
            autoComplete="off"
        >
            <div className="w-full">
                <label
                    htmlFor="username"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Nama Lengkap
                </label>
                <SelectWithSearch
                    data={members}
                    value={data}
                    setData={setData}
                />
            </div>
            {step === 1 ? null : (
                <NextSimpananPokok
                    data={simpanan}
                    getTahun={getTahun}
                    step={step}
                    valueData={data}
                    setData={setData}
                    handleNominal={handleNominal}
                />
            )}
            <div className="w-full flex justify-end items-center">
                {processing ? (
                    <ButtonLoading color="primary" />
                ) : (
                    <>
                        {step === 1 ? (
                            <button
                                type="button"
                                onClick={handleStep}
                                name="button-sumbit"
                                className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Lanjut
                            </button>
                        ) : (
                            <button
                                type="submit"
                                name="button-sumbit"
                                className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Kirim
                            </button>
                        )}
                    </>
                )}
            </div>
        </form>
    );
};

export default FormSimpanan;
