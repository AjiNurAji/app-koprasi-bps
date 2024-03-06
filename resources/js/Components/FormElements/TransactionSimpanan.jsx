import PostData from "@/Libs/postData";
import { useForm, router } from "@inertiajs/react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import ButtonLoading from "../ButtonLoading";
import NextSimpanan from "./NextStepSimpanan";

const TransactionSimpanan = ({ type, directUrl, postUrl }) => {
    const [processing, setProcess] = useState(false);
    const [simpanan, setSimpanan] = useState([]);
    const [simpananPrev, setSimpananPrev] = useState(null);
    const [member, setMember] = useState([]);
    const form = useRef(null);
    const nipRef = useRef(null);
    const [step, setStep] = useState(1);
    const { data, setData } = useForm({
        name: "",
        id_member: "",
        nip: "",
        tahun: null,
        bulan: "",
        hari: "",
        awal_tahun: null,
        tahun_sebelumnya: null,
        anggota_masuk: null,
        anggota_keluar: null,
        simpanan_wajib: null,
        kekayaan_awal_tahun: null,
        sukarela: null,
        shu: null,
        selama_tahun: null,
        diambil: null,
        disimpan_kembali: null,
        akhir_tahun: null,
    });

    useEffect(() => {
        setData({
            ...data,
            awal_tahun: simpananPrev ? simpananPrev : 0,
            tahun_sebelumnya: simpananPrev ? simpananPrev : 0,
        });
    }, [simpananPrev]);

    const submit = async (e) => {
        e.preventDefault();
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
        setProcess(true);
        const toastLoading = toast.loading("Loading...");

        try {
            const response = await axios.post(directUrl, data, {
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
                setSimpananPrev(response.data.sebelum);
                setMember(response.data.member);
                if (response.data.simpanan) {
                    setSimpanan(response.data.simpanan);
                }
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
            [n]: v === undefined ? v : Number(v),
        });
    };

    useEffect(() => {
        setData({
            ...data,
            id_member: member ? member.id_member : null,
        });
    }, [member]);

    const handleValue = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            {step === 1 ? (
                <form className="w-full" onSubmit={handleStep}>
                    <div className="w-full">
                        <label
                            htmlFor="nip"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            Masukkan NIP Anggota
                        </label>
                        <input
                            type="text"
                            id="nip"
                            name="nip"
                            ref={nipRef}
                            required
                            onChange={(e) => handleValue(e)}
                            placeholder="Masukkan NIP anggota"
                            className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full mt-4">
                        {processing ? (
                            <ButtonLoading color="primary" />
                        ) : (
                            <button
                                type="submit"
                                name="button-sumbit"
                                className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Cari Data
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <form className="w-full" onSubmit={submit}>
                    <div className="flex flex-col gap-4">
                        <NextSimpanan
                            data={simpanan}
                            awalTahun={simpananPrev}
                            getTahun={new Date()}
                            type={type}
                            step={step}
                            valueData={data}
                            setData={setData}
                            handleNominal={handleNominal}
                        />
                    </div>
                    <div className="w-full mt-4w">
                        {processing ? (
                            <ButtonLoading color="primary" />
                        ) : (
                            <button
                                type="submit"
                                name="button-sumbit"
                                className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Kirim
                            </button>
                        )}
                    </div>
                </form>
            )}
        </>
    );
};

export default TransactionSimpanan;
