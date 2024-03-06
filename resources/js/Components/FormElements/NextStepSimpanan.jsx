import CurrencyInput from "react-currency-input-field";

const NextSimpanan = ({
    data,
    valueData,
    awalTahun,
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
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {`Awal Tahun ${getTahun.getFullYear()}`}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            allowDecimals={true}
                            name="awal_tahun"
                            id="awal_tahun"
                            disabled={awalTahun}
                            value={awalTahun ? awalTahun : valueData.awal_tahun}
                            onValueChange={(value, name) =>
                                handleNominal(value, name)
                            }
                            intlConfig={{
                                locale: "in-ID",
                                currency: "IDR",
                            }}
                            className="w-full disabled:bg-stroke dark:disabled:bg-strokedark rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="anggota_masuk"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.anggota_masuk
                                ? "Tambah Anggota Masuk"
                                : "Anggota Masuk"}
                        </label>
                        <div className="relative w-full">
                            <CurrencyInput
                                autoComplete="off"
                                placeholder={`Masukkan nominal ${
                                    data?.anggota_masuk
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
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.anggota_keluar
                                ? "Tambah Anggota Keluar"
                                : "Anggota Keluar"}
                        </label>
                        <div className="relative w-full">
                            <CurrencyInput
                                autoComplete="off"
                                placeholder={`Masukkan nominal ${
                                    data?.anggota_keluar
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
                    <div className="w-full p-3 border border-stroke dark:border-strokedark rounded-md bg-whiten dark:bg-black dark:bg-opacity-25">
                        <label
                            htmlFor="kekayaan_awal_tahun"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {`Kekayaan Awal Tahun ${getTahun.getFullYear()}`}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            
                            required
                            allowDecimals={true}
                            name="kekayaan_awal_tahun"
                            id="kekayaan_awal_tahun"
                            value={awalTahun ? awalTahun : valueData.awal_tahun}
                            disabled={awalTahun}
                            onValueChange={(value, name) =>
                                handleNominal(value, name)
                            }
                            intlConfig={{
                                locale: "in-ID",
                                currency: "IDR",
                            }}
                            className="w-full text-black border-none bg-transparent px-0 dark:text-whiten"
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="simpanan_wajib"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.simpanan_wajib
                                ? "Tambah Simpanan Wajib"
                                : "Simpanan Wajib"}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data?.simpanan_wajib ? "tambahan" : "transaksi"
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
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.anggota_keluar
                                ? "Tambah Anggota Keluar"
                                : "Anggota Keluar"}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data?.anggota_keluar ? "tambahan" : "transaksi"
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
            ) : type === "sukarela" ? (
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                    <div className="w-full">
                        <label
                            htmlFor="sukarela"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.sukarela
                                ? "Tambah sukarela dari pembulatan"
                                : "Sukarela dari pembulatan"}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data?.sukarela ? "tambahan" : "transaksi"
                            }`}
                            allowDecimals={true}
                            name="sukarela"
                            id="sukarela"
                            value={valueData.sukarela}
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
                            htmlFor="shu"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.shu
                                ? "Tambah SHU yang disimpan"
                                : "SHU yang disimpan"}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data?.shu ? "tambahan" : "transaksi"
                            }`}
                            allowDecimals={true}
                            name="shu"
                            id="shu"
                            value={valueData.shu}
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
                    <div className="w-full p-3 border border-stroke dark:border-strokedark rounded-md bg-whiten dark:bg-black dark:bg-opacity-25">
                        <label
                            htmlFor="awal_tahun"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {`Awal ${new Date().getFullYear()}`}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Nominal Awal Tahun`}
                            allowDecimals={true}
                            name="awal_tahun"
                            id="awal_tahun"
                            value={(valueData.sukarela ? valueData.sukarela : 0 ) + (valueData.shu ? valueData.shu : 0)}
                            disabled
                            intlConfig={{
                                locale: "in-ID",
                                currency: "IDR",
                            }}
                            className="w-full text-black border-none bg-transparent px-0 dark:text-whiten"
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="selama_tahun"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.selama_tahun
                                ? `Tambah selama tahun ${new Date().getFullYear()}`
                                : `Selama tahun ${new Date().getFullYear()}`}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data?.selama_tahun ? "tambahan" : "transaksi"
                            }`}
                            allowDecimals={true}
                            name="selama_tahun"
                            id="selama_tahun"
                            value={valueData.selama_tahun}
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
                            htmlFor="diambil"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.diambil ? "Tambah diambil" : "Diambil"}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data?.diambil ? "tambahan" : "transaksi"
                            }`}
                            allowDecimals={true}
                            name="diambil"
                            id="diambil"
                            value={valueData.diambil}
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
                            htmlFor="disimpan_kembali"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            {data?.disimpan_kembali
                                ? "Tambah disimpan kembali"
                                : "Disimpan kembali"}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            placeholder={`Masukkan nominal ${
                                data?.disimpan_kembali ? "tambahan" : "transaksi"
                            }`}
                            allowDecimals={true}
                            name="disimpan_kembali"
                            id="disimpan_kembali"
                            value={valueData.disimpan_kembali}
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
            ) : null}
        </>
    );
};

export default NextSimpanan;
