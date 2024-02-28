import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

const StepPinjaman = ({
    data,
    valueData,
    awalTahun,
    type,
    handleNominal,
    getTahun,
    setStep,
    setData,
}) => {
    const [steps, setSteps] = useState(1);

    const handleStep = (e, type) => {
        e.preventDefault();
        setData({
            ...valueData,
            jenis_bayar: type,
        });
        setSteps(2);
        setStep(4);
    };

    useEffect(() => {
        setData({
            ...valueData,
            total_pinjaman:
                (data.jasa_anggota / 100) *
                    (valueData.nominal ? valueData.nominal : 0) +
                (valueData.nominal ? valueData.nominal : 0),
        });
    }, [valueData.nominal]);


    console.log(data)

    return (
        <>
            {type === "bayar" ? (
                <>
                    {steps === 1 ? (
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <button
                                className="bg-primary rounded-md hover:bg-opacity-90 py-2 px-3 text-white"
                                onClick={(e) => handleStep(e, "cicilan")}
                            >
                                Cicilan
                            </button>
                            <button
                                className="bg-primary rounded-md hover:bg-opacity-90 py-2 px-3 text-white"
                                onClick={(e) => handleStep(e, "langsung")}
                            >
                                Langsung
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="w-full">
                                <label
                                    htmlFor="pinjaman"
                                    className="mb-2.5 font-medium text-black dark:text-white"
                                >
                                    Total Pinjaman
                                </label>
                                <CurrencyInput
                                    autoComplete="off"
                                    allowDecimals={true}
                                    name="pinjaman"
                                    id="pinjaman"
                                    disabled
                                    value={
                                        (data.sisa ? data.sisa : 0)
                                    }
                                    intlConfig={{
                                        locale: "in-ID",
                                        currency: "IDR",
                                    }}
                                    className="w-full disabled:bg-transparent dark:disabled:bg-transparent disabled:border-none disabled:px-1 rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="nominal"
                                    className="mb-2.5 capitalize font-medium text-black dark:text-white"
                                >
                                    {`Nominal Bayar ${valueData.jenis_bayar}`}
                                </label>
                                <div className="relative w-full">
                                    <CurrencyInput
                                        autoComplete="off"
                                        placeholder="Masukkan nominal pembayaran"
                                        allowDecimals={true}
                                        name="nominal"
                                        id="nominal"
                                        required
                                        value={valueData.nominal}
                                        onValueChange={(value, name) =>
                                            handleNominal(value, name)
                                        }
                                        intlConfig={{
                                            locale: "in-ID",
                                            currency: "IDR",
                                        }}
                                        className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="sisa"
                                    className="mb-2.5 font-medium text-black dark:text-white"
                                >
                                    Sisa Pinjaman
                                </label>
                                <div className="relative w-full">
                                    <CurrencyInput
                                        autoComplete="off"
                                        disabled
                                        allowDecimals={true}
                                        name="sisa"
                                        id="sisa"
                                        value={
                                            (awalTahun ? awalTahun : 0) +
                                            (data.sisa ? data.sisa : 0) -
                                            (valueData.nominal
                                                ? valueData.nominal
                                                : 0)
                                        }
                                        onValueChange={(value, name) =>
                                            handleNominal(value, name)
                                        }
                                        intlConfig={{
                                            locale: "in-ID",
                                            currency: "IDR",
                                        }}
                                        className="w-full disabled:bg-transparent dark:disabled:bg-transparent disabled:border-none disabled:px-1 rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : type === "pinjam" ? (
                <>
                    <div className="w-full">
                        <label
                            htmlFor="nominal"
                            className="mb-2.5 font-medium text-black dark:text-white"
                        >
                            Nominal
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal pinjaman`}
                            allowDecimals={true}
                            name="nominal"
                            id="nominal"
                            required
                            value={valueData.nominal}
                            onValueChange={(value, name) =>
                                handleNominal(value, name)
                            }
                            intlConfig={{
                                locale: "in-ID",
                                currency: "IDR",
                            }}
                            className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-2">
                        <div className="w-auto py-3 px-2 border border-stroke dark:border-strokedark rounded-md bg-whiten">
                            <label
                                htmlFor="jasa_anggota"
                                className="mb-2.5 font-medium text-black dark:text-white"
                            >
                                Jasa Anggota
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                name="jasa_anggota"
                                id="jasa_anggota"
                                disabled
                                value={
                                    data.jasa_anggota
                                        ? `${data.jasa_anggota}%`
                                        : 0
                                }
                                className="w-full disabled:bg-transparent dark:disabled:bg-transparent  disabled:border-none disabled:px-1 rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-auto py-3 px-2 border border-stroke dark:border-strokedark rounded-md bg-whiten">
                            <label
                                htmlFor="total_pinjaman"
                                className="mb-2.5 font-medium text-black dark:text-white"
                            >
                                Total Jasa Anggota
                            </label>
                            <CurrencyInput
                                autoComplete="off"
                                allowDecimals={true}
                                name="total_pinjaman"
                                id="total_pinjaman"
                                disabled
                                value={
                                    (data.jasa_anggota / 100) *
                                    (valueData.nominal ? valueData.nominal : 0)
                                }
                                onValueChange={(value, name) =>
                                    handleNominal(value, name)
                                }
                                intlConfig={{
                                    locale: "in-ID",
                                    currency: "IDR",
                                }}
                                className="w-full disabled:bg-transparent dark:disabled:bg-transparent  disabled:border-none disabled:px-1 rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-auto py-3 px-2 border border-stroke dark:border-strokedark rounded-md bg-whiten">
                            <label
                                htmlFor="total_pinjaman"
                                className="mb-2.5 font-medium text-black dark:text-white"
                            >
                                Total Pinjaman
                            </label>
                            <CurrencyInput
                                autoComplete="off"
                                allowDecimals={true}
                                name="total_pinjaman"
                                id="total_pinjaman"
                                disabled
                                value={
                                    (data.jasa_anggota / 100) *
                                        (valueData.nominal
                                            ? valueData.nominal
                                            : 0) +
                                    (valueData.nominal ? valueData.nominal : 0)
                                }
                                onValueChange={(value, name) =>
                                    handleNominal(value, name)
                                }
                                intlConfig={{
                                    locale: "in-ID",
                                    currency: "IDR",
                                }}
                                className="w-full disabled:bg-transparent dark:disabled:bg-transparent  disabled:border-none disabled:px-1 rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default StepPinjaman;
