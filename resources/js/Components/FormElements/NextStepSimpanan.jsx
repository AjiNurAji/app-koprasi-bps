import CurrencyInput from "react-currency-input-field";

const NextSimpanan = ({
    data,
    valueData,
    setData,
    type,
    handleNominal,
    getTahun,
}) => {

    return (
        <>
            {type === "pokok" ? (
                <>
                    <div className="w-full">
                        <label
                            htmlFor="awal_tahun"
                            className="mb-2.5 font-medium text-black dark:text-white"
                        >
                            {data.awal_tahun
                                ? `Tambah Awal Tahun ${getTahun.getFullYear()}`
                                : `Awal Tahun ${getTahun.getFullYear()}`}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data.awal_tahun ? "tambahan" : "transaksi"
                            }`}
                            allowDecimals={true}
                            name="awal_tahun"
                            id="awal_tahun"
                            required
                            value={valueData.awal_tahun}
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
                    <div className="w-full">
                        <label
                            htmlFor="anggota_masuk"
                            className="mb-2.5 font-medium text-black dark:text-white"
                        >
                            {data.anggota_masuk
                                ? "Tambah Anggota Masuk"
                                : "Anggota Masuk"}
                        </label>
                        <div className="relative w-full">
                            <CurrencyInput
                                autoComplete="off"
                                placeholder={`Masukkan nominal ${
                                    data.anggota_masuk
                                        ? "tambahan"
                                        : "transaksi"
                                }`}
                                allowDecimals={true}
                                name="anggota_masuk"
                                id="anggota_masuk"
                                value={valueData.anggota_masuk}
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
                            htmlFor="anggota_keluuar"
                            className="mb-2.5 font-medium text-black dark:text-white"
                        >
                            {data.anggota_keluar
                                ? "Tambah Anggota Keluar"
                                : "Anggota Keluar"}
                        </label>
                        <div className="relative w-full">
                            <CurrencyInput
                                autoComplete="off"
                                placeholder={`Masukkan nominal ${
                                    data.anggota_keluar
                                        ? "tambahan"
                                        : "transaksi"
                                }`}
                                allowDecimals={true}
                                name="anggota_keluar"
                                id="anggota_keluar"
                                value={valueData.anggota_keluar}
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
                </>
            ) : type === "wajib" ? (
                <>
                    <div className="w-full">
                        <label
                            htmlFor="kekayaan_awal_tahun"
                            className="mb-2.5 font-medium text-black dark:text-white"
                        >
                            {data.kekayaan_awal_tahun
                                ? `Tambah Kekayaan Awal Tahun ${getTahun.getFullYear()}`
                                : `Kekayaan Awal Tahun ${getTahun.getFullYear()}`
                            }
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data.kekayaan_awal_tahun
                                    ? "tambahan"
                                    : "transaksi"
                            }`}
                            required
                            allowDecimals={true}
                            name="kekayaan_awal_tahun"
                            id="kekayaan_awal_tahun"
                            value={valueData.kekayaan_awal_tahun}
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
                    <div className="w-full">
                        <label
                            htmlFor="simpanan_wajib"
                            className="mb-2.5 font-medium text-black dark:text-white"
                        >
                            {data.simpanan_wajib
                                ? "Tambah Simpanan Wajib"
                                : "Simpanan Wajib"
                            }
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data.simpanan_wajib ? "tambahan" : "transaksi"
                            }`}
                            allowDecimals={true}
                            name="simpanan_wajib"
                            id="simpanan_wajib"
                            value={valueData.simpanan_wajib}
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
                    <div className="w-full">
                        <label
                            htmlFor="anggota_keluar"
                            className="mb-2.5 font-medium text-black dark:text-white"
                        >
                            {data.anggota_keluar
                                ? "Tambah Anggota Keluar"
                                : "Anggota Keluar"
                            }
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data.anggota_keluar ? "tambahan" : "transaksi"
                            }`}
                            allowDecimals={true}
                            name="anggota_keluar"
                            id="anggota_keluar"
                            value={valueData.anggota_keluar}
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
                </>
            ) : null}
        </>
    );
};

export default NextSimpanan;
