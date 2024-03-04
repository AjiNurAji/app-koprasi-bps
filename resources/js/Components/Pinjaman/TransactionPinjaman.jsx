import { useState, useRef, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import PostData from "@/Libs/postData";
import { router } from "@inertiajs/react";
import ButtonLoading from "../ButtonLoading";
import CurrencyInput from "react-currency-input-field";

const TransactionPinjaman = ({ datas, user, step, setStep }) => {
    const [processing, setProcess] = useState(false);
    const [pinjaman, setPinjaman] = useState([]);
    const [member, setMember] = useState([]);
    const [pinjamanPrev, setPinjamanPrev] = useState(null);
    const [type, setType] = useState("");
    const form = useRef(null);
    const nipRef = useRef(null);
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

    useEffect(() => {
        setData({
            ...data,
            name: member ? member.name : null,
            no_hp: member ? member.no_hp : null,
        });
    }, [member]);

    const submit = async (e) => {
        e.preventDefault();
        if (!data.nominal) return toast.error("Nominal Wajib Diisi!");
        setProcess(true);

        const create = await PostData(route("pinjaman_anggota_create"), data);

        if (create) {
            form.current.reset();
            setPopup(false);
            setProcess(false);
            router.get(route("pinjaman_anggota"));
        }

        setProcess(false);
    };

    const handleStep = async (e) => {
        e.preventDefault();
        if (!data.nip) {
            nipRef.current.focus();
            return toast.error("NIP wajib diisi!", {
                duration: 3000,
            });
        }
        setProcess(true);
        const toastLoading = toast.loading("Loading...");

        try {
            const response = await axios.post(
                type === "pinjaman"
                    ? route("pinjaman_anggota")
                    : route("bayar_pinjaman_anggota"),
                data,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                toast.success(response.data.message, {
                    id: toastLoading,
                    duration: 3000,
                });
                setMember(response.data.member);
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

    console.log({ data, member });

    const handleNominal = (v, n) => {
        setData({
            ...data,
            [n]: v === undefined ? v : Number(v),
        });
    };

    const handleValue = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            {step === 1 ? (
                <div className="w-full">
                    <label
                        htmlFor="jenis_transaksi"
                        className="mb-2.5 inline-block font-medium text-black dark:text-white"
                    >
                        Jenis Transaksi
                    </label>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-2 items-center justify-center">
                        <button
                            className="border py-2 h-full rounded-md border-primary bg-primary text-white hover:bg-opacity-90"
                            onClick={() => {
                                setType("pinjaman");
                                setStep(2);
                            }}
                        >
                            Pinjaman
                        </button>
                        <button
                            className="border py-2 h-full rounded-md border-primary bg-primary text-white hover:bg-opacity-90"
                            onClick={() => {
                                setType("pembayar");
                                setStep(2);
                            }}
                        >
                            Pembayaran
                        </button>
                    </div>
                </div>
            ) : step === 2 ? (
                <>
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
                                type="button"
                                onClick={handleStep}
                                name="button-sumbit"
                                className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Cari Data
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <form
                    className="flex w-full flex-col gap-4"
                    onSubmit={submit}
                    ref={form}
                    autoComplete="off"
                >
                    <div className="w-full">
                        <label
                            htmlFor="jenis_transaksi"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            Jenis Transaksi
                        </label>
                        <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                            {type ? type : "-"}
                        </span>
                    </div>
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
                            htmlFor="no_hp"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            No Hp
                        </label>
                        <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                            {data.no_hp ? data.no_hp : "-"}
                        </span>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="nominal"
                            className="mb-2.5 font-medium inline-block text-black dark:text-white"
                        >
                            Nominal Pengajuan Pinjaman
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal pinjaman`}
                            allowDecimals={true}
                            name="nominal"
                            id="nominal"
                            required
                            value={data.nominal}
                            onValueChange={(value, name) =>
                                handleNominal(value, name)
                            }
                            intlConfig={{
                                locale: "in-ID",
                                currency: "IDR",
                            }}
                            className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        <d className="flex items-center gap-3 mt-1">
                            <div className="w-max">
                                <small className="font-medium block">
                                    Jasa Anggota
                                </small>
                                <small>
                                    {pinjaman.jasa_anggota
                                        ? `${pinjaman.jasa_anggota}%`
                                        : 0}
                                </small>
                            </div>
                            <div className="w-max">
                                <small className="font-medium block">
                                    Total Jasa Anggota
                                </small>
                                <small>
                                    {data.nominal
                                        ? Intl.NumberFormat("in-ID", {
                                              style: "currency",
                                              currency: "IDR",
                                              maximumFractionDigits: "0"
                                          }).format(
                                              (pinjaman.jasa_anggota / 100) *
                                                  (data.nominal
                                                      ? data.nominal
                                                      : 0)
                                          )
                                        : "-"}
                                </small>
                            </div>
                        </d>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TransactionPinjaman;
