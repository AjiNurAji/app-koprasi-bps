import { useEffect, useRef, useState } from "react";
import ButtonLoading from "../ButtonLoading";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { GrClearOption } from "react-icons/gr";
import { useForm } from "@inertiajs/react";

const ProfileUpdate = ({ user }) => {
    const [hide, setHide] = useState(true);
    const [file, setFile] = useState();
    const [size, setSize] = useState();
    const [preview, setPreview] = useState();
    const [processing, setProcess] = useState(false);
    const fileRef = useRef(null);
    const { data, setData } = useForm({
        username: "",
        image: "",
        name: "",
        password: "",
    });

    useEffect(() => {
        if (!file) return;
        const objectUrl = URL.createObjectURL(file[0]);

        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    useEffect(() => {
        if (!file) return;
        if (file[0].size < 1024) {
            setSize(`${file[0].size} bytes`);
        } else if (file[0].size >= 1024 && file[0].size < 1048576) {
            setSize(`${(file[0].size / 1024).toFixed(1)} KB`);
        } else if (file[0].size >= 1048576) {
            setSize(`${(file[0].size / 1048576).toFixed(1)} MB`);
        }
    }, [file]);

    return (
        <div className="relative px-5 py-6.5 border border-stroke dark:border-strokedark rounded-md bg-white dark:bg-boxdark">
            <h2 className="absolute bg-primary px-2.5 py-1 rounded-full -top-3 font-bold text-lg text-white">
                Ubah Data
            </h2>
            <form
                className="flex flex-col gap-4 w-full mt-4"
                // onSubmit={submit}
                // ref={form}
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
                        // ref={inputUsername}
                        autoComplete="username"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={(e) => handleValue(e)}
                        placeholder="Ganti username"
                        className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div className="w-full">
                    <label
                        htmlFor="namaLengkap"
                        className="mb-2.5 font-medium text-black dark:text-white"
                    >
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        autoComplete="namaLengkap"
                        id="namaLengkap"
                        name="name"
                        value={user.name}
                        onChange={(e) => handleValue(e)}
                        placeholder="Ganti nama"
                        className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div className="w-full relative">
                    <label
                        htmlFor="dropzone-file"
                        className="mb-2.5 font-medium text-black dark:text-white"
                    >
                        Foto Profile{" "}
                        <span className="text-meta-1 text-xs">
                            (jika tidak ingin diganti kosongkan)
                        </span>
                    </label>
                    <label
                        htmlFor="dropzone-file"
                        className={`flex flex-col items-center justify-center w-full h-auto border-2 ${
                            file === undefined ? "border-stroke dark:border-strokedark"
                                : file[0].size < 2048576
                                    ? "!border-meta-3"
                                    : "!border-meta-1"
                        } border-dashed rounded-md cursor-pointer dark:bg-black hover:bg-stroke hover:bg-opacity-25`}
                    >
                        <div className="flex flex-col w-full relative items-center justify-center pt-5 pb-6">
                            {file === undefined ? (
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
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
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
                                    {preview && (
                                        <span className="h-15 w-15 rounded-full mb-3 overflow-hidden">
                                            <img
                                                src={preview}
                                                alt={file[0].name}
                                            />
                                        </span>
                                    )}
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        {file[0].name}
                                    </p>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        {size}
                                    </p>
                                </>
                            )}
                        </div>
                        <input
                            id="dropzone-file"
                            name="image"
                            accept=".png, .jpg, .webp, .jpeg"
                            onChange={(e) => setFile(e.target.files)}
                            type="file"
                            ref={fileRef}
                            className="hidden"
                        />
                    </label>
                    {file ? (
                        <button
                            type="button"
                            className="absolute top-8 right-2 cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 w-fit"
                            onClick={() => {
                                fileRef.current.value = null;
                                setFile(undefined);
                                setPreview(undefined);
                                setSize(undefined);
                            }}
                        >
                            <GrClearOption />
                        </button>
                    ) : null}
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
                            Update Data
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProfileUpdate;
