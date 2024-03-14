import { useRef, useState } from "react";
import ButtonLoading from "../ButtonLoading";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import CurrencyInput from "react-currency-input-field";
import PostData from "@/Libs/postData";

const FormKasRekening = ({ bulan, saldo }) => {
    const [processing, setProcess] = useState(false);
    const jenis = useRef(null);
    const transaksi = useRef(null);
    const date = new Date();
    const { data, setData, reset } = useForm({
        bulan: date.toLocaleDateString("in-ID", { month: "long" }),
        type: 1,
        rekening: 1,
        nominal: null,
        saldo_awal: saldo ? saldo.saldo_awal : null,
        tahun: date.getFullYear(),
    });

    const submit = async (e) => {
        e.preventDefault();
        if (data.type === 1) {
            transaksi.current.focus();
        } else if (data.rekening === 1) {
            jenis.current.focus();
        } else {
            setProcess(true);

            const create = await PostData(route("kas_rekening"), data);

            if (create) {
                setProcess(false);
                reset();
                router.get(route("kas_rekening"));
            }
            setProcess(false);
        }
    };

    const handleValue = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleNominal = (v, n) => {
        setData({
            ...data,
            [n]: v === undefined ? v : Number(v),
        });
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={submit}
            autoComplete="off"
        >
            <div className="w-full">
                <label
                    htmlFor="bulan"
                    className="mb-2.5 font-medium inline-block text-black dark:text-white"
                >
                    Bulan
                </label>
                <select
                    name="bulan"
                    id="bulan"
                    defaultValue={data.bulan}
                    onChange={(e) => handleValue(e)}
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                    {bulan.map((v, i) => (
                        <option key={i} value={v}>
                            {v}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full">
                <label
                    htmlFor="nominal"
                    className="mb-2.5 font-medium inline-block text-black dark:text-white"
                >
                    Nominal
                </label>
                <CurrencyInput
                    autoComplete="off"
                    placeholder="Masukkan Nominal"
                    allowDecimals={true}
                    name="nominal"
                    id="nominal"
                    onValueChange={(value, name) => handleNominal(value, name)}
                    intlConfig={{
                        locale: "in-ID",
                        currency: "IDR",
                    }}
                    required
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div className="w-full">
                <label
                    htmlFor="transaksi"
                    className="mb-2.5 font-medium inline-block text-black dark:text-white"
                >
                    Jenis Transaksi
                </label>
                <select
                    name="type"
                    id="transaksi"
                    defaultValue={data.type}
                    ref={transaksi}
                    onChange={(e) => handleValue(e)}
                    className="w-full capitalize rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                    <option value={1} className="capitalize">
                        pilih jenis transaksi
                    </option>
                    <option value="setor" className="capitalize">
                        setor
                    </option>
                    <option value="bunga_bank" className="capitalize">
                        bunga bank
                    </option>
                    <option value="pajak" className="capitalize">
                        pajak
                    </option>
                    <option value="adm" className="capitalize">
                        ADM
                    </option>
                    <option value="penarikan" className="capitalize">
                        penarikan
                    </option>
                </select>
            </div>
            <div className="w-full">
                <label
                    htmlFor="jenis"
                    className="mb-2.5 font-medium inline-block text-black dark:text-white"
                >
                    Jenis Rekening
                </label>
                <select
                    name="rekening"
                    id="jenis"
                    defaultValue={data.rekening}
                    ref={jenis}
                    onChange={(e) => handleValue(e)}
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                    <option value={1}>Pilih Jenis Rekening</option>
                    <option value="debet">Debet</option>
                    <option value="kredit">Kredit</option>
                </select>
            </div>
            <div className="w-full flex justify-end items-center">
                {processing ? (
                    <ButtonLoading color="primary" />
                ) : (
                    <button
                        type="submit"
                        name="button-sumbit"
                        className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                    >
                        Tambah Data
                    </button>
                )}
            </div>
        </form>
    );
};

export default FormKasRekening;
