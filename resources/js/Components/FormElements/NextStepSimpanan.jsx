import CurrencyInput from "react-currency-input-field";

const NextSimpanan = ({
    data,
    ambil,
    valueData,
    awalTahun,
    jenis,
    type,
    handleNominal,
    getTahun,
    handleValue,
    pokok,
    setPokok,
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
                        <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                            {awalTahun ? awalTahun : "-"}
                        </span>
                    </div>
                    {!pokok ? (
                        <div className="w-full flex justify-between items-center gap-4 sm:gap-6">
                            <button
                                type="button"
                                name="button-sumbit"
                                onClick={() => setPokok("masuk")}
                                className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Anggota Masuk
                            </button>
                            <button
                                type="button"
                                name="button-sumbit"
                                onClick={() => setPokok("keluar")}
                                className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Anggota Keluar
                            </button>
                        </div>
                    ) : (
                        <>
                            {pokok === "masuk" ? (
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
                            ) : (
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
                            )}
                        </>
                    )}
                </>
            ) : type === "wajib" ? (
                <>
                    {jenis === "simpan" ? (
                        <>
                            <div className="w-full">
                                <label
                                    htmlFor="kekayaan_awal_tahun"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    {`Kekayaan Awal Tahun ${getTahun.getFullYear()}`}
                                </label>
                                <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                    {awalTahun
                                        ? Intl.NumberFormat("in-ID", {
                                              style: "currency",
                                              currency: "IDR",
                                              maximumFractionDigits: "0",
                                          }).format(awalTahun)
                                        : "-"}
                                </span>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="simpanan_wajib"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    Nominal Simpan
                                </label>
                                <CurrencyInput
                                    autoComplete="off"
                                    placeholder={`Masukkan nominal simpanan`}
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
                        </>
                    ) : (
                        <>
                            <div className="w-full">
                                <label
                                    htmlFor="simpanan_wajib"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    Simpanan Wajib
                                </label>
                                <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                    {Intl.NumberFormat("in-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        maximumFractionDigits: "0",
                                    }).format(
                                        (awalTahun ? awalTahun : 0) +
                                            data
                                                .map((r) => r.simpanan_wajib)
                                                .reduce((p, c) => p + c, 0) -
                                            ambil
                                    )}
                                </span>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="nominal"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    Nominal Pengambilan
                                </label>
                                <CurrencyInput
                                    autoComplete="off"
                                    placeholder={`Masukkan nominal pengambilan`}
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
                                    htmlFor="note"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    Catatan
                                </label>
                                <textarea
                                    name="note"
                                    id="note"
                                    onChange={(e) => handleValue(e)}
                                    rows="2"
                                    required
                                    value={data.note}
                                    className="w-full resize-none rounded-md disabled:bg-whiten border text-dark dark:text-white border-stroke bg-transparent py-1 pl-2 pr-3 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    placeholder="Catatan"
                                ></textarea>
                            </div>
                        </>
                    )}
                </>
            ) : type === "sukarela" ? (
                <>
                    {jenis === "simpan" ? (
                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                            <div className="w-full">
                                <label
                                    htmlFor="sukarela"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    Sukarela dari pembulatan
                                </label>

                                {data.sukarela ? (
                                    <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                        {data.sukarela
                                            ? Intl.NumberFormat("in-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(data.sukarela)
                                            : "-"}
                                    </span>
                                ) : (
                                    <CurrencyInput
                                        autoComplete="off"
                                        placeholder={`Masukkan nominal sukarela dari pembulatan`}
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
                                )}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="shu"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    SHU yang disimpan
                                </label>
                                {data.shu ? (
                                    <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                        {data.shu
                                            ? Intl.NumberFormat("in-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(data.shu)
                                            : "-"}
                                    </span>
                                ) : (
                                    <CurrencyInput
                                        autoComplete="off"
                                        placeholder={`Masukkan nominal shu yang disimpan`}
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
                                )}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="awal_tahun"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    {`Awal ${new Date().getFullYear()}`}
                                </label>

                                {data.awal_tahun ? (
                                    <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                        {data.awal_tahun
                                            ? Intl.NumberFormat("in-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(data.awal_tahun)
                                            : "-"}
                                    </span>
                                ) : (
                                    <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                                        {(valueData.sukarela
                                            ? valueData.sukarela
                                            : 0) +
                                        (valueData.shu ? valueData.shu : 0)
                                            ? Intl.NumberFormat("in-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: "0",
                                              }).format(
                                                  (valueData.sukarela
                                                      ? valueData.sukarela
                                                      : 0) +
                                                      (valueData.shu
                                                          ? valueData.shu
                                                          : 0)
                                              )
                                            : "-"}
                                    </span>
                                )}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="selama_tahun"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    Nominal simpan
                                </label>
                                <CurrencyInput
                                    autoComplete="off"
                                    placeholder="Masukkan nominal simpan"
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
                        </div>
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                                <div className="w-full">
                                    <label
                                        htmlFor="nominal"
                                        className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                    >
                                        Nominal Pemngambilan
                                    </label>
                                    <CurrencyInput
                                        autoComplete="off"
                                        placeholder="Masukkan nominal pengambilan"
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
                                        htmlFor="disimpan_kembali"
                                        className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                    >
                                        Disimpan Kembali
                                    </label>
                                    <CurrencyInput
                                        autoComplete="off"
                                        placeholder="Masukkan nominal disimpan kembali"
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
                            <div className="w-full">
                                <label
                                    htmlFor="note"
                                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                                >
                                    Catatan
                                </label>
                                <textarea
                                    name="note"
                                    id="note"
                                    onChange={(e) => handleValue(e)}
                                    rows="2"
                                    required
                                    value={data.note}
                                    className="w-full resize-none rounded-md disabled:bg-whiten border text-dark dark:text-white border-stroke bg-transparent py-1 pl-2 pr-3 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    placeholder="Catatan"
                                ></textarea>
                            </div>
                        </>
                    )}
                </>
            ) : null}
        </>
    );
};

export default NextSimpanan;
