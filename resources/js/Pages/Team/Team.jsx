import Authenticated from "@/Layouts/AuthenticatedLayout";

const Team = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h1 className="text-title-sm">
                    Hallo, Kami Dari{" "}
                    <a
                        href="https://smkn4kuningan.sch.id"
                        className="font-medium"
                    >
                        SMK Negeri 4 Kuningan
                    </a>
                </h1>
                <p className="mt-3">Kami membuat project ini untuk tugas akhir pada Praktik Kerja Lapangan (PKL)</p>
            </div>
        </Authenticated>
    );
};

export default Team;
