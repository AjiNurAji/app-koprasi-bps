import PostData from "@/Libs/postData";
import { useForm, router } from "@inertiajs/react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import ButtonLoading from "../ButtonLoading";
import NextSimpanan from "./NextStepSimpanan";

const TransactionSimpanan = ({ type, directUrl, postUrl, ambilUrl }) => {
    const [processing, setProcess] = useState(false);
    const [simpanan, setSimpanan] = useState([]);
    const [ambil, setAmbil] = useState([]);
    const [simpananPrev, setSimpananPrev] = useState(null);
    const [jenis, setType] = useState();
    const [member, setMember] = useState([]);
    const [pokok, setPokok] = useState("");
    const nipRef = useRef(null);
    const [step, setStep] = useState(1);
    const { data, setData, reset } = useForm({
        name: "",
        id_member: "",
        nip: "",
        date: "",
        tahun: null,
        bulan: "",
        note: "",
        hari: "",
        awal_tahun: 0,
        tahun_sebelumnya: null,
        anggota_masuk: null,
        nominal: null,
        anggota_keluar: null,
        simpanan_wajib: null,
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
        if (!data.date) return toast.error("Mohon set tanggal transaksi!");
        setProcess(true);

        const create = await PostData(
            jenis === "simpan" || !jenis ? postUrl : ambilUrl,
            data
        );

        if (create) {
            reset();
            setProcess(false);
            router.get(directUrl);
        }

        setProcess(false);
    };

    const handleStep = async (e) => {
        e.preventDefault();
        setProcess(true);
        const toastLoading = toast.loading("Loading...", { className: "dark:bg-boxdark dark:text-white" });

        try {
            const response = await axios.post(directUrl, data, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (response.data) {
                if (jenis === "ambil" && response.data.nominalSimpanan === 0) {
                    toast.error("Tidak ada sisa simpanan!", {
                        id: toastLoading,
                        duration: 3000,
                        className: "dark:bg-boxdark dark:text-white"
                    });
                    reset();
                    setType("");
                    setProcess(false);
                    return setStep(1);
                }

                toast.success(response.data.message, {
                    id: toastLoading,
                    duration: 3000,
                    className: "dark:bg-boxdark dark:text-white"
                });
                setSimpananPrev(response.data.sebelum);
                if (response.data.simpanan) {
                    setSimpanan(response.data.simpanan);
                }
                if (response.data.anggota_keluar) {
                    setAmbil(response.data.anggota_keluar);
                }
                if (response.data.member) {
                    setMember(response.data.member);
                }
                setProcess(false);
                return setStep(2);
            }

            toast.error(response.message, {
                id: toastLoading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white"
            });
            setProcess(false);
            return setStep(1);
        } catch (error) {
            setProcess(false);
            toast.error(error.response.data.message, {
                id: toastLoading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white"
            });
        }
    };
    const searchMember = async (e) => {
        e.preventDefault();
        setProcess(true);
        const toastLoading = toast.loading("Loading...", { className: "dark:bg-boxdark dark:text-white" });

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
                    className: "dark:bg-boxdark dark:text-white"
                });

                setMember(response.data.member);
                return setProcess(false);
            }

            toast.error(response.message, {
                id: toastLoading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white"
            });
            setProcess(false);
            return setStep(1);
        } catch (error) {
            setProcess(false);
            toast.error(error.response.data.message, {
                id: toastLoading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white"
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
            name: member ? member.name : null,
            nip: member ? member.NIP : null,
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
                <form
                    className="w-full flex relative flex-col gap-4"
                    onSubmit={
                        data.id_member || type === "pokok"
                            ? handleStep
                            : searchMember
                    }
                >
                    {type !== "pokok" && (
                        <div className="w-full">
                            <label
                                htmlFor="jenis_transaksi"
                                className="mb-2.5 inline-block font-medium text-black dark:text-white"
                            >
                                Jenis Transaksi
                            </label>
                            {!jenis ? (
                                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-2 items-center justify-center">
                                    <button
                                        type="button"
                                        className="border py-2 h-full rounded-md border-primary bg-primary text-white hover:bg-opacity-90"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setType("simpan");
                                        }}
                                    >
                                        Simpan
                                    </button>
                                    <button
                                        type="button"
                                        className="border py-2 h-full rounded-md border-primary bg-primary text-white hover:bg-opacity-90"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setType("ambil");
                                        }}
                                    >
                                        Ambil
                                    </button>
                                </div>
                            ) : (
                                <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                    {jenis ? jenis : "-"}
                                </span>
                            )}
                        </div>
                    )}
                    {jenis || type === "pokok" ? (
                        <>
                            <div className="w-full">
                                <label
                                    htmlFor="nip"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    {!data.id_member && "Masukkan "}NIP Anggota
                                </label>
                                {data.id_member ? (
                                    <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                        {data.nip ? data.nip : "-"}
                                    </span>
                                ) : (
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
                                )}
                            </div>
                            {data.id_member && (
                                <>
                                    <div
                                        className="click_animation absolute top-2 right-2 w-max cursor-pointer rounded-md border border-warning bg-warning py-1 px-3 text-white transition hover:bg-opacity-90"
                                        onClick={() => {
                                            setStep(1);
                                            setType("");
                                            setPokok("");
                                            reset();
                                        }}
                                    >
                                        Batal
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="name"
                                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                        >
                                            Nama Anggota
                                        </label>
                                        <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                            {data.name ? data.name : "-"}
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="date"
                                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                        >
                                            Tanggal Transaksi
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            value={data.date}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const date = new Date(value);

                                                setData({
                                                    ...data,
                                                    date: e.target.value,
                                                    hari: date.toLocaleDateString(
                                                        "en-ID",
                                                        {
                                                            weekday: "long",
                                                        }
                                                    ),
                                                    tahun: date.getFullYear(),
                                                    bulan: date.toLocaleDateString(
                                                        "en-ID",
                                                        {
                                                            month: "long",
                                                        }
                                                    ),
                                                });
                                            }}
                                            className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="w-full">
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
                        </>
                    ) : null}
                </form>
            ) : (
                <form
                    className="w-full flex flex-col relative gap-4"
                    onSubmit={submit}
                >
                    <div
                        className="click_animation absolute top-2 right-2 w-max cursor-pointer rounded-md border border-warning bg-warning py-1 px-3 text-white transition hover:bg-opacity-90"
                        onClick={() => {
                            setStep(1);
                            setType("");
                            setPokok("");
                            reset();
                        }}
                    >
                        Batal
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="w-full">
                            <label
                                htmlFor="nip"
                                className="mb-2.5 inline-block font-medium text-black dark:text-white"
                            >
                                NIP Anggota
                            </label>
                            <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                {data.nip ? data.nip : "-"}
                            </span>
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="name"
                                className="mb-2.5 inline-block font-medium text-black dark:text-white"
                            >
                                Nama Anggota
                            </label>
                            <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                {data.name ? data.name : "-"}
                            </span>
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="date"
                                className="mb-2.5 inline-block font-medium text-black dark:text-white"
                            >
                                Tanggal Transaksi
                            </label>
                            {type !== "pokok" ? (
                                <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                    {data.date ? data.date : "-"}
                                </span>
                            ) : (
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={data.date}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const date = new Date(value);

                                        setData({
                                            ...data,
                                            date: e.target.value,
                                            hari: date.toLocaleDateString(
                                                "en-ID",
                                                {
                                                    weekday: "long",
                                                }
                                            ),
                                            tahun: date.getFullYear(),
                                            bulan: date.toLocaleDateString(
                                                "en-ID",
                                                {
                                                    month: "long",
                                                }
                                            ),
                                        });
                                    }}
                                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            )}
                        </div>
                        <NextSimpanan
                            data={simpanan}
                            awalTahun={simpananPrev}
                            getTahun={new Date()}
                            type={type}
                            ambil={ambil}
                            jenis={jenis}
                            step={step}
                            valueData={data}
                            setData={setData}
                            handleValue={handleValue}
                            handleNominal={handleNominal}
                            pokok={pokok}
                            setPokok={setPokok}
                        />
                    </div>
                    {!pokok && type === "pokok" ? null : (
                        <div className="w-full">
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
                    )}
                </form>
            )}
        </>
    );
};

export default TransactionSimpanan;
