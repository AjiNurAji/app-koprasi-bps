import { useRef, useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import ButtonLoading from "../ButtonLoading";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PostData from "@/Libs/postData";

const FormSimpanan = () => {
    const [hide, setHide] = useState(true);
    const [processing, setProcess] = useState(false);
    const inputUsername = useRef(null);
    const form = useRef(null);
    const { data, setData } = useForm({
        username: "",
        name: "",
        email: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const create = await PostData(route('create_member'), data);

        if (create) {
            form.current.reset();
            setProcess(false);
            router.get(route("members"));
        }

        inputUsername.current.focus();
        setProcess(false);
    };

    const handleValue = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={submit} ref={form}>
            <div className="w-full">
                <label
                    htmlFor="username"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Nama Anggota
                </label>
                <input
                    type="text"
                    ref={inputUsername}
                    autoComplete="name"
                    id="namaLengkap"
                    name="name"
                    required
                    onChange={(e) => handleValue(e)}
                    placeholder="Masukkan nama anggota"
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div className="w-full">
                <label
                    htmlFor="username"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Nama Lengkap
                </label>
                <input
                    type="text"
                    autoComplete="namaLengkap"
                    id="namaLengkap"
                    name="name"
                    required
                    onChange={(e) => handleValue(e)}
                    placeholder="Masukkan nama lengkap anggota"
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div className="w-full">
                <label
                    htmlFor="email"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Alamat Email
                </label>
                <input
                    type="email"
                    autoComplete="email"
                    id="email"
                    name="email"
                    required
                    onChange={(e) => handleValue(e)}
                    placeholder="Masukkan alamat email anggota"
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div className="w-full">
                <label
                    htmlFor="password"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Buat Password
                </label>
                <div className="relative w-full">
                    <input
                        type={hide ? "password" : "text"}
                        name="password"
                        required
                        onChange={(e) => handleValue(e)}
                        autoComplete="current-password"
                        id="password"
                        placeholder="Buatkan password untuk anggota"
                        className="relative w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <div
                        onClick={() => setHide(!hide)}
                        className="absolute top-3.5 right-4 cursor-pointer text-body hover:text-black dark:hover:text-white"
                    >
                        {hide ? <PiEyeLight /> : <PiEyeSlash />}
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end items-center">
                {processing ? (
                    <ButtonLoading color="primary" />
                ) : (
                    <button
                        type="submit"
                        name="button-sumbit"
                        className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                    >
                        Tambah Anggota
                    </button>
                )}
            </div>
        </form>
    );
};

export default FormSimpanan;