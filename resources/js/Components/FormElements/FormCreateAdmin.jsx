import { useRef, useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import ButtonLoading from "../ButtonLoading";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PostData from "@/Libs/postData";

const FormCreateAdmin = ({ setPopup }) => {
    const [hide, setHide] = useState(true);
    const [processing, setProcess] = useState(false);
    const inputUsername = useRef(null);
    const form = useRef(null);
    const { data, setData } = useForm({
        username: "",
        image: "",
        name: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const create = await PostData(route("create_admin"), data);

        if (create) {
            form.current.reset();
            setPopup(false);
            setProcess(false);
            router.get(route("admin"));
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

    const setFilename = (e) => {
        const filename = e.target.value.split(/(\\|\/)/g).pop();
        setData({
            ...data,
            image: e.target.value,
            filename: filename,
        });
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={submit}
            ref={form}
            encType="multipart/form-data"
        >
            <div className="w-full">
                <label
                    htmlFor="username"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Username
                </label>
                <input
                    type="text"
                    ref={inputUsername}
                    autoComplete="username"
                    id="username"
                    name="username"
                    required
                    onChange={(e) => handleValue(e)}
                    placeholder="Buatkan username untuk admin"
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
                    placeholder="Masukkan nama lengkap admin"
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            {/* <div className="w-full">
                <label
                    htmlFor="dropzone-file"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Foto Profile
                </label>
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-auto border-2 border-stroke border-dashed rounded-md cursor-pointer dark:bg-black hover:bg-stroke hover:bg-opacity-25 dark:border-strokedark"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {data.image == "" ? (
                            <>
                                <svg
                                    className="w-8 h-8 mb-4 text-primary"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG, JPG, JPEG or WEBP (MAX. 2MB)
                                </p>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-8 h-8 mb-4 text-primary"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    {data.filename}
                                </p>
                            </>
                        )}
                    </div>
                    <input
                        id="dropzone-file"
                        name="image"
                        accept="image/png,image/jpg,image/webp,image/jpeg"
                        onChange={(e) => setFilename(e)}
                        type="file"
                        class="hidden"
                    />
                </label>
            </div> */}
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
                        placeholder="Buatkan password untuk admin"
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
                        Tambah Admin
                    </button>
                )}
            </div>
        </form>
    );
};

export default FormCreateAdmin;
