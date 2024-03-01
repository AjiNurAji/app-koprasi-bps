import { useRef, useState } from "react";
import ButtonLoading from "../ButtonLoading";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import CurrencyInput from "react-currency-input-field";
import PostData from "@/Libs/postData";

const FormKasTunai = ({ setPopup, bulan, saldo }) => {
    const [processing, setProcess] = useState(false);
    const form = useRef(null);
    const date = new Date();
    const { data, setData } = useForm({
        bulan: date.toLocaleDateString("in-ID", { month: "long" }),
        masuk: null,
        saldo_awal: saldo ? saldo.saldo_awal : null,
        tahun: date.getFullYear(),
        keluar: null,
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const create = await PostData(route("kas_tunai"), data);

        if (create) {
            form.current.reset();
            setPopup(false);
            setProcess(false);
            router.get(route("kas_tunai"));
        }
        setProcess(false);
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
            ref={form}
            autoComplete="off"
        >
            <div className="w-full">
                <label
                    htmlFor="bulan"
                    className="mb-2.5 font-medium text-black dark:text-white"
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
                    htmlFor="masuk"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Masuk
                </label>
                <CurrencyInput
                    autoComplete="off"
                    placeholder="Nominal masuk"
                    allowDecimals={true}
                    name="masuk"
                    id="masuk"
                    value={data.masuk}
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
                    htmlFor="keluar"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Keluar
                </label>
                <CurrencyInput
                    autoComplete="off"
                    placeholder="Nominal keluar"
                    allowDecimals={true}
                    name="keluar"
                    id="keluar"
                    value={data.keluar}
                    onValueChange={(value, name) => handleNominal(value, name)}
                    required
                    intlConfig={{
                        locale: "in-ID",
                        currency: "IDR",
                    }}
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
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

export default FormKasTunai;
