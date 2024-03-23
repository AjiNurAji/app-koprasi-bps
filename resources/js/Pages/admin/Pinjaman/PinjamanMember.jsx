import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const PinjamanMember = ({ auth, pinjaman }) => {
    const date = new Date();
    console.log(pinjaman);
    return (
        <Authenticated user={auth.user}>
            <Head title={`Pinjaman ${pinjaman.name}`} />
            <a
                className="bg-primary text-white py-2 px-3 rounded-md mb-3 inline-block"
                href={route("pinjaman_anggota")}
            >
                Kembali
            </a>
            <div className="rounded-md w-full flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <h1 className="font-bold uppercase text-center text-xl">
                    Daftar Pinjaman {pinjaman.name}
                </h1>
                <table className="w-full mt-10">
                    <thead>
                        <tr>
                            <th
                                colSpan={4}
                                className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-center bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize"
                            >
                                pinjaman
                            </th>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-start bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize">
                                Tanggal Pinjam
                            </th>
                            <th className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-start bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize">
                                Nominal
                            </th>
                            <th className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-start bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize">
                                Jangka Waktu
                            </th>
                            <th className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-start bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize">
                                Untuk Keperluan
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pinjaman.pinjaman.map((value, i) => (
                            <tr key={i}>
                                <td className="px-4 py-2 border border-stroke dark:border-strokedark font-normal  text-start">
                                    {value.tanggal_pinjam}
                                </td>
                                <td className="px-4 py-2 border border-stroke dark:border-strokedark font-normal  text-start">
                                    {Intl.NumberFormat("en-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        maximumFractionDigits: "0",
                                    }).format(value.nominal)}
                                </td>
                                <td className="px-4 py-2 border border-stroke dark:border-strokedark font-normal  text-start">
                                    {value.jangka_waktu}
                                </td>
                                <td className="px-4 py-2 border border-stroke dark:border-strokedark font-normal  text-start">
                                    {value.untuk_keperluan}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3} className="px-4 py-2 border border-stroke dark:border-strokedark font-medium text-center">
                                Total Pinjaman
                            </td>
                            <td className="px-4 py-2 border border-stroke dark:border-strokedark font-medium text-center">
                                {Intl.NumberFormat("en-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: "0",
                                }).format(pinjaman.total)}
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th
                                colSpan={4}
                                className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-center bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize"
                            >
                                Pembayaran
                            </th>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-start bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize">
                                Tanggal Bayar
                            </th>
                            <th className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-start bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize">
                                Nominal
                            </th>
                            <th className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-start bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize">
                                Metode Pembayaran
                            </th>
                            <th className="px-4 py-2 border border-stroke dark:border-strokedark font-medium  text-start bg-whiten dark:bg-strokedark dark:bg-opacity-50 capitalize">
                                Catatan
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {pinjaman.bayar.map((value, i) => (
                            <tr key={i}>
                                <td className="px-4 py-2 border border-stroke dark:border-strokedark font-normal  text-start">
                                    {value.tanggal_bayar}
                                </td>
                                <td className="px-4 py-2 border border-stroke dark:border-strokedark font-normal  text-start">
                                    {Intl.NumberFormat("en-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        maximumFractionDigits: "0",
                                    }).format(value.nominal)}
                                </td>
                                <td className="px-4 py-2 border border-stroke dark:border-strokedark font-normal  text-start">
                                    {value.method}
                                </td>
                                <td className="px-4 py-2 border border-stroke dark:border-strokedark font-normal  text-start">
                                    {value.note}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3} className="px-4 py-2 border border-stroke dark:border-strokedark font-medium text-center">
                                Total Terbayar
                            </td>
                            <td className="px-4 py-2 border border-stroke dark:border-strokedark font-medium text-center">
                                {Intl.NumberFormat("en-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: "0",
                                }).format(pinjaman.total_terbayar)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="px-4 py-2 border border-stroke dark:border-strokedark font-medium text-center">
                                Sisa Pinjaman
                            </td>
                            <td className="px-4 py-2 border border-stroke dark:border-strokedark font-medium text-center">
                                {Intl.NumberFormat("en-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: "0",
                                }).format(pinjaman.sisa)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Authenticated>
    );
};
export default PinjamanMember;
