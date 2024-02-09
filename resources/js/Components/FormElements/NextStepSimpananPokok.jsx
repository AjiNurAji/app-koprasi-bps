import { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

const NextSimpananPokok = ({ data, valueData, step, setData, handleNominal, getTahun }) => {
    
    useEffect(() => {
        setData({
            ...valueData,
            awal_tahun: data.awal_tahun == null ? null : data.awal_tahun,
            anggota_masuk: data.anggota_masuk == null ? null : data.anggota_masuk,
            anggota_keluar: data.anggota_keluar == null ? null : data.anggota_keluar,
        })
    }, [step])


    return (
        <>
            <div className="w-full">
                <label
                    htmlFor="awal_tahun"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    {`Awal Tahun ${getTahun.getFullYear()}`}
                </label>
                <CurrencyInput
                    autoComplete="off"
                    placeholder="Masukkan nominal transaksi"
                    allowDecimals={true}
                    name="awal_tahun"
                    id="awal_tahun"
                    value={data.awal_tahun}
                    defaultValue={data.awal_tahun}
                    onValueChange={(value, name) => handleNominal(value, name)}
                    intlConfig={{
                        locale: "id-ID",
                        currency: "IDR",
                    }}
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div className="w-full">
                <label
                    htmlFor="anggota_masuk"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Anggota Masuk
                </label>
                <div className="relative w-full">
                    <CurrencyInput
                        autoComplete="off"
                        placeholder="Masukkan nominal transaksi"
                        allowDecimals={true}
                        name="anggota_masuk"
                        id="anggota_masuk"
                        value={data.anggota_masuk}
                        defaultValue={data.anggota_masuk}
                        onValueChange={(value, name) =>
                            handleNominal(value, name)
                        }
                        intlConfig={{
                            locale: "id-ID",
                            currency: "IDR",
                        }}
                        className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
            </div>
            <div className="w-full">
                <label
                    htmlFor="anggota_keluuar"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Anggota Keluar
                </label>
                <div className="relative w-full">
                    <CurrencyInput
                        autoComplete="off"
                        placeholder="Masukkan nominal transaksi"
                        allowDecimals={true}
                        name="anggota_keluar"
                        id="anggota_keluar"
                        value={data.anggota_keluar}
                        onValueChange={(value, name) =>
                            handleNominal(value, name)
                        }
                        intlConfig={{
                            locale: "id-ID",
                            currency: "IDR",
                        }}
                        className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
            </div>
        </>
    );
};

export default NextSimpananPokok;
