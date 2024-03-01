import { useEffect, useRef, useState } from "react";
import ButtonLoading from "../ButtonLoading";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { GrClearOption } from "react-icons/gr";
import { useForm } from "@inertiajs/react";
import FileInput from "./FileInput";
import PostData from "@/Libs/postData";

const ProfileUpdate = ({ user }) => {
    const [hide, setHide] = useState(true);
    const [processing, setProcess] = useState(false);

    const { data, setData } = useForm({
        username: "",
        image: null,
        name: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        const response = await PostData(
            route("post_file"),
            data,
            "multipart/form-data"
        );
    };

    return (
        <div className="relative px-5 py-6.5 border border-stroke dark:border-strokedark rounded-md bg-white dark:bg-boxdark">
            <h2 className="absolute bg-primary px-2.5 py-1 rounded-full -top-3 font-bold text-lg text-white">
                Ubah Data
            </h2>
            <form
                className="flex flex-col gap-4 w-full mt-4"
                onSubmit={submit}
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
                <FileInput
                    label={"Foto Profile"}
                    note="jika tidak ingin diganti kosongkan"
                    fileType=" PNG, JPG, JPEG or WEBP"
                    max="2MB"
                    accept=".png, .jpg, .webp, .jpeg"
                    name={"image"}
                    data={data}
                    setData={setData}
                    max_size={2097152}
                />
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
