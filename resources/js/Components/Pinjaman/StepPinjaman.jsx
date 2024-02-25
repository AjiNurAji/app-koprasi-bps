import CurrencyInput from "react-currency-input-field";

const StepPinjaman = ({
    data,
    valueData,
    awalTahun,
    type,
    handleNominal,
    getTahun,
}) => {
    return (
        <>
            {type === "bayar" ? (
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
                            allowDecimals={true}
                            name="awal_tahun"
                            id="awal_tahun"
                            required
                            value={awalTahun ? awalTahun : 0}
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
            ) : type === "pinjam" ? (
                <>
                    <div className="w-full">
                        <label
                            htmlFor="taun_kemarin"
                            className="mb-2.5 font-medium text-black dark:text-white"
                        >
                            {`Sisa Pinjaman`}
                        </label>
                        <CurrencyInput
                            autoComplete="off"
                            required
                            allowDecimals={true}
                            name="taun_kemarin"
                            id="taun_kemarin"
                            value={
                                (awalTahun ? awalTahun : 0) +
                                (data.sisa ? data.sisa : 0)
                            }
                            disabled
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
                    <div className="w-full">
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
                                (awalTahun ? awalTahun : 0) +
                                (data.sisa ? data.sisa : 0) +
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
                </>
            ) : null}
        </>
    );
};

export default StepPinjaman;
