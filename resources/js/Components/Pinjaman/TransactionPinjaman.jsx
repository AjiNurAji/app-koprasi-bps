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
    const [waktu, setWaktu] = useState(null);
    const [disabled, setDisabled] = useState(true);
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
        jangka_waktu: "",
        keperluan: "",
        bank_tujuan: "",
        no_rek: "",
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
            id_member: member ? member.id_member : null,
        });
    }, [member]);

    useEffect(() => {
        if (waktu === 1) {
            setData({
                ...data,
                jangka_waktu: "1 Bulan",
            });
        } else if (waktu === 2) {
            setData({
                ...data,
                jangka_waktu: "10 Bulan",
            });
        } else if (waktu === 3) {
            setData({
                ...data,
                jangka_waktu: "20 Bulan Berjalan",
            });
        }

        if (waktu === 4) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [waktu]);

    useEffect(() => {
        setData({
            ...data,
            total_pinjaman:
                (pinjaman.jasa_anggota / 100) *
                    (data.nominal ? data.nominal : 0) +
                (data.nominal ? data.nominal : 0),
        });
    }, [data.nominal]);

    const submit = async (e) => {
        e.preventDefault();
        if (!data.nominal) return toast.error("Nominal Wajib Diisi!");
        setProcess(true);

        const create = await PostData(route("pinjaman_anggota_create"), data);

        if (create) {
            form.current.reset();
            setProcess(false);
            setStep(1)
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
        <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                            htmlFor="date"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            Tanggal Pinjam
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
                                    hari: date.toLocaleDateString("in-ID", {
                                        weekday: "long",
                                    }),
                                    tahun: date.getFullYear(),
                                    bulan: date.toLocaleDateString("in-ID", {
                                        month: "long",
                                    }),
                                });
                            }}
                            className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
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
                            placeholder={`Masukkan nominal pengajuan pinjaman`}
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
                        <div className="flex items-center gap-6 mt-1">
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
                                              maximumFractionDigits: "0",
                                          }).format(
                                              (pinjaman.jasa_anggota / 100) *
                                                  (data.nominal
                                                      ? data.nominal
                                                      : 0)
                                          )
                                        : "-"}
                                </small>
                            </div>
                            <div className="w-max">
                                <small className="font-medium block">
                                    Total Pinjaman
                                </small>
                                <small>
                                    {data.nominal
                                        ? Intl.NumberFormat("in-ID", {
                                              style: "currency",
                                              currency: "IDR",
                                              maximumFractionDigits: "0",
                                          }).format(
                                              (pinjaman.jasa_anggota / 100) *
                                                  (data.nominal
                                                      ? data.nominal
                                                      : 0) +
                                                  (data.nominal
                                                      ? data.nominal
                                                      : 0)
                                          )
                                        : "-"}
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="jangka_waktu"
                            className="mb-2.5 font-medium inline-block text-black dark:text-white"
                        >
                            Jangka Waktu
                        </label>
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="jangka_waktu"
                                    value={1}
                                    id="one"
                                    onClick={() => setWaktu(1)}
                                />
                                <label
                                    htmlFor="one"
                                    className="w-max cursor-pointer"
                                >
                                    1 Bulan
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="jangka_waktu"
                                    id="two"
                                    value={2}
                                    onClick={() => setWaktu(2)}
                                />
                                <label
                                    htmlFor="two"
                                    className="w-max cursor-pointer"
                                >
                                    10 Bulan
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="jangka_waktu"
                                    id="three"
                                    value={3}
                                    onClick={() => setWaktu(3)}
                                />
                                <label
                                    className="w-max cursor-pointer"
                                    htmlFor="three"
                                >
                                    20 Bulan Berjalan
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="jangka_waktu"
                                    id="lain"
                                    value={4}
                                    onClick={() => setWaktu(4)}
                                />
                                <label
                                    className="w-max cursor-pointer"
                                    htmlFor="lain"
                                >
                                    Yang lain :{" "}
                                </label>
                                <input
                                    type="text"
                                    id="jangka_waktu"
                                    name="jangka_waktu"
                                    ref={nipRef}
                                    required
                                    disabled={disabled}
                                    onChange={(e) => handleValue(e)}
                                    placeholder="Ex: 12 Bulan"
                                    className="w-auto rounded-md capitalize disabled:bg-whiten border text-dark dark:text-white border-stroke bg-transparent py-1 pl-2 pr-3 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="keperluan"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            Untuk Keperluan
                        </label>
                        <textarea
                            name="keperluan"
                            id="keperluan"
                            onChange={(e) => handleValue(e)}
                            rows="2"
                            required
                            value={data.keperluan}
                            className="w-full resize-none rounded-md disabled:bg-whiten border text-dark dark:text-white border-stroke bg-transparent py-1 pl-2 pr-3 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="Keperluan peminjaman"
                        ></textarea>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="bank_tujuan"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            Bank Tujuan
                        </label>
                        <input
                            type="text"
                            id="bank_tujuan"
                            name="bank_tujuan"
                            required
                            onChange={(e) => handleValue(e)}
                            placeholder="Masukkan Bank Tujuan"
                            className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="no_rek"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            No Rekening
                        </label>
                        <input
                            type="text"
                            id="no_rek"
                            name="no_rek"
                            required
                            onChange={(e) => handleValue(e)}
                            placeholder="Masukkan Nomor Rekening"
                            className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full">
                        <button
                            type="submit"
                            name="button-sumbit"
                            className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                        >
                            Kirim
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TransactionPinjaman;
