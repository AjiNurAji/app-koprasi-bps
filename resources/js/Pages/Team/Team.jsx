import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import aji from "@/assets/images/team/aji.jpg";
import yusuf from "@/assets/images/team/yusuf.jpg";
import { Head } from "@inertiajs/react";

const author = [
    {
        nama: "Aji Nur Aji",
        image: aji,
        social: {
            ig: "https://instagram.com/ajnrji_",
            linkedin: "https://id.linkedin.com/in/ajinuraji",
            github: "https://github.com/ajinuraji",
        },
    },
    {
        nama: "Tia Niandari",
        image: null,
        social: {
            ig: "https://instagram.com/tynndr_",
            linkedin: "https://id.linkedin.com/in/tianiandari",
            github: "https://github.com/tiaa28",
        },
    },
    {
        nama: "Muhammad Yusuf Aradabila",
        image: yusuf,
        social: {
            ig: "https://instagram.com/ardabila_",
            github: "https://github.com/MYusuArdabila",
        },
    },
    {
        nama: "Gina Rahma Juliana",
        image: null,
        social: {
            ig: "https://instagram.com/xxgnrhm_",
        },
    },
];

const Team = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Team" />
            <Breadcrumb pageName="Team" />
            <div className="rounded-md border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex justify-center items-center flex-col gap-2">
                    <h2 className="font-semibold text-center text-black dark:text-white">
                        Tim Kami
                    </h2>
                    <h1 className="font-bold text-title-md text-center text-black dark:text-white">
                        Murid SMK Negeri 4 Kuningan
                    </h1>
                    <p className="text-body dark:text-bodydarke text-center text-wrap w-full sm:w-3/4">
                        Kami menjalankan praktik kerja lapangan (PKL) di Kantor
                        BPS Kabupaten Kuningan, dan kami membuat applikasi ini
                        untuk laporan akhir praktik (sidang). Terima kasih telah
                        menerima kami untuk melaksanakan praktik kerja lapangan
                        di kantor BPS Kabupaten Kuningan.
                    </p>
                </div>
                <div className="my-5 grid grid-cols-2 gap-3 md:gap-5  md:grid-cols-3 lg:gap-7 lg:grid-cols-4">
                    {author.map((item, i) => (
                        <div
                            key={i + 1}
                            className="bg-white shadow-md dark:bg-black rounded-md border p-4 border-stroke dark:border-strokedark flex justify-start items-start flex-col gap-3"
                        >
                            <div className="overflow-hidden w-full h-50 rounded-md">
                                <img
                                    src={item.image}
                                    alt={item.nama}
                                    className="w-full h-auto"
                                    loading="lazy"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold capitalize">
                                    {item.nama}
                                </h3>
                                <div className="flex mt-2 justify-start items-center gap-3">
                                    <a
                                        href={item.social.ig}
                                        target="_blank"
                                        className="text-xl text-black hover:text-primary dark:hover:text-primary dark:text-white hover:scale-90"
                                    >
                                        <FaInstagram />
                                    </a>
                                    {item.social.github ? (
                                        <a
                                            href={item.social.github}
                                            target="_blank"
                                            className="text-xl text-black hover:text-primary dark:hover:text-primary dark:text-white hover:scale-90"
                                        >
                                            <FaGithub />
                                        </a>
                                    ) : null}
                                    {item.social.linkedin ? (
                                        <a
                                            href={item.social.linkedin}
                                            target="_blank"
                                            className="text-xl text-black hover:text-primary dark:hover:text-primary dark:text-white hover:scale-90"
                                        >
                                            <FaLinkedin />
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default Team;
