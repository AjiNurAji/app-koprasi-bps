import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const PinjamanMember = ({ auth, pinjaman, bulan }) => {
    const date = new Date();
    console.log({ pinjaman, bulan });
    return (
        <Authenticated user={auth.user}>
            <Head title={`Pinjaman ${pinjaman.name}`} />
            <a className="bg-primary text-white py-2 px-3 rounded-md mb-3 inline-block" href={route('pinjaman_anggota')}>Kembali</a>
            <div className="rounded-md mb-4 md:mb-6 w-full flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <h1 className="font-bold uppercase text-xl">
                    Daftar Pinjaman {pinjaman.name} {date.getFullYear()}
                </h1>
                <div className="flex justify-between items-start w-full mt-3">
                    <div className="flex flex-col gap-2 items-start justify-start">
                        <p className="font-bold">
                            Sisa Pinjaman {date.getFullYear() - 1}{" "}
                        </p>
                        {bulan.map((value, i) => (
                            <p key={i}>{value}</p>
                        ))}
                        <p className="font-bold">Total</p>
                        <p className="font-bold">Dibayar</p>
                        <p className="font-bold">Sisa</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end font-semibold justify-start">
                        <p>
                            {pinjaman.tahun_lalu
                                ? Intl.NumberFormat("in-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                  }).format(pinjaman.tahun_lalu)
                                : "-"}
                        </p>
                        {pinjaman.total_pinjaman.map((value, i) => (
                            <p key={i}>
                                {value
                                    ? Intl.NumberFormat("in-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                      }).format(value)
                                    : "-"}
                            </p>
                        ))}
                        <p>
                            {pinjaman.total
                                ? Intl.NumberFormat("in-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                  }).format(pinjaman.total)
                                : "-"}
                        </p>
                        <p>
                            {pinjaman.total_terbayar
                                ? Intl.NumberFormat("in-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                  }).format(pinjaman.total_terbayar)
                                : "-"}
                        </p>
                        <p>
                            {Intl.NumberFormat("in-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(
                                pinjaman.total_sisa ? pinjaman.total_sisa : 0
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};
export default PinjamanMember;
