import { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ButtonLoading from "../ButtonLoading";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PostData from "@/Libs/postData";
import axios from "axios";
import SelectWithSearch from "../FormElements/SelectWithSearch";
import StepPinjaman from "./StepPinjaman";

const FormPinjaman = ({
    members,
    setPopup,
    postUrl,
    directUrl,
    type,
    setType,
}) => {
    const [processing, setProcess] = useState(false);
    const [pinjaman, setPinjaman] = useState([]);
    const [pinjamanPrev, setPinjamanPrev] = useState(null);
    const form = useRef(null);
    const [step, setStep] = useState(1);
    const { data, setData } = useForm({
        name: "",
        id_member: "",
        nip: "",
        no_hp: "",
        tahun_sebelumnya: null,
        nominal: null,
        jenis_bayar: "",
        jasa_anggota: null,
        id_pinjaman: "",
        hari: "",
        tahun: null,
        bulan: "",
        date: "",
        total_pinjaman: null,
    });

    useEffect(() => {
        setData({
            ...data,
            tahun_sebelumnya: pinjamanPrev ? pinjamanPrev : null,
        });
    }, [pinjamanPrev]);

    const submit = async (e) => {
        e.preventDefault();
        if (!data.nominal) return toast.error("Nominal Wajib Diisi!");
        setProcess(true);

        const create = await PostData(postUrl, data);

        if (create) {
            form.current.reset();
            setPopup(false);
            setProcess(false);
            router.get(directUrl);
        }

        setProcess(false);
    };


    const handleStep = async (e) => {
        e.preventDefault();
        if (!data.name)
            return toast.error("Nama wajib diisi!", {
                duration: 3000,
            });
        setProcess(true);
        const toastLoading = toast.loading("Loading...");

        try {
            const response = await axios.post((type === "pinjam" ? directUrl : route("bayar_pinjaman_anggota")), data, {
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
                setPinjamanPrev(response.data.sebelum);
                if (response.data.pinjaman) {
                    setPinjaman(response.data.pinjaman);
                }
                setProcess(false);
                return setStep(3);
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
            if (error.response.data.redirect) {
                setTimeout(() => {
                    router.get(route("jasa_piutang"));
                    toast.success("Silahkan isi jasa anggota!");
                }, 1000);
            }
        }
    };

    const handleNominal = (v, n) => {
        setData({
            ...data,
            [n]: v === undefined ? v : Number(v),
        });
    };

    return (
        <>
            {step === 1 ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-6 items-center justify-center">
                    <button
                        className="border py-2 h-full rounded-md border-primary bg-primary text-white hover:bg-opacity-90"
                        onClick={() => {
                            setType("pinjam");
                            setStep(2);
                        }}
                    >
                        Pinjaman
                    </button>
                    <button
                        className="border py-2 h-full rounded-md border-primary bg-primary text-white hover:bg-opacity-90"
                        onClick={() => {
                            setType("bayar");
                            setStep(2);
                        }}
                    >
                        Pembayaran
                    </button>
                </div>
            ) : (
                <form
                    className="flex w-full flex-col gap-4"
                    onSubmit={submit}
                    ref={form}
                    autoComplete="off"
                >
                    <div className="w-full">
                        <label
                            htmlFor="username"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            Nama Lengkap
                        </label>
                        <SelectWithSearch
                            data={members}
                            value={data}
                            type={type}
                            step={step}
                            setData={setData}
                        />
                    </div>
                    {step === 2 ? null : (
                        <StepPinjaman
                            data={pinjaman}
                            awalTahun={pinjamanPrev}
                            type={type}
                            setData={setData}
                            setStep={setStep}
                            handleNominal={handleNominal}
                            valueData={data}
                        />
                    )}
                    <div className="w-full flex justify-end items-center">
                        {processing ? (
                            <ButtonLoading color="primary" />
                        ) : (
                            <>
                                {step === 2 ? (
                                    <button
                                        type="button"
                                        onClick={handleStep}
                                        name="button-sumbit"
                                        className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                                    >
                                        Lanjut
                                    </button>
                                ) : (step === 3 && type == "pinjam") ||
                                  (step === 4 && type == "bayar") ? (
                                    <button
                                        type="submit"
                                        name="button-sumbit"
                                        className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                                    >
                                        Kirim
                                    </button>
                                ) : null}
                            </>
                        )}
                    </div>
                </form>
            )}
        </>
    );
};

export default FormPinjaman;
