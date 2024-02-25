import bps from "@/assets/images/icon-bps.png";
import { Head } from "@inertiajs/react";

const notFound = () => {
    return (
        <div className="flex min-h-screen justify-center items-center bg-white dark:bg-boxdark">
            <Head title="Not Found" />
            <div className="flex flex-col items-start justify-center gap-3 px-4">
                <div className="overflow-hidden w-20 h-auto">
                    <img src={bps} alt="Icon BPS" />
                </div>
                <h1 className="font-bold text-title-lg">
                    Halaman tidak ditemukan | 404
                </h1>
                <p className="font-semibold">
                    Kembali ke -{" "}
                    <a
                        href={route("dashboard")}
                        className="text-primary hover:underline"
                    >
                        Halaman Utama
                    </a>{" "}
                </p>
            </div>
        </div>
    );
};

export default notFound;
