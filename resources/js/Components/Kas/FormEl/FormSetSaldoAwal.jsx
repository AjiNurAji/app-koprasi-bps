import ButtonLoading from "@/Components/ButtonLoading";
import PostData from "@/Libs/postData";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const FormSetSaldoAwal = ({ name, postUrl, directUrl }) => {
    const [processing, setProcess] = useState(false);
    const date = new Date();
    const { data, setData, reset } = useForm({
        name,
        tahun: date.getFullYear(),
        saldo_awal: null,
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const create = await PostData(postUrl, data);

        if (create) {
            reset()
            setProcess(false);
            router.get(directUrl);
        }

        setProcess(false);
    };

    const handleNominal = (v, n) => {
        setData({
            ...data,
            [n]: v === undefined ? v : Number(v),
        });
    };

    console.log(data);

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={submit}
            autoComplete="off"
        >
            <div className="w-full">
                <label
                    htmlFor="saldo_awal"
                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                >
                    Saldo Awal
                </label>
                <CurrencyInput
                    autoComplete="off"
                    placeholder="Masukkan nominal saldo"
                    allowDecimals={true}
                    name="saldo_awal"
                    id="saldo_awal"
                    required
                    value={data.saldo_awal}
                    onValueChange={(value, name) => handleNominal(value, name)}
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
                        Tambahkan Saldo
                    </button>
                )}
            </div>
        </form>
    );
};

export default FormSetSaldoAwal;