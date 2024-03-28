import { useEffect, useState } from "react";
import ButtonLoading from "../ButtonLoading";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useForm, router } from "@inertiajs/react";
import FileInput from "./FileInput";
import PostData from "@/Libs/postData";

const ProfileUpdate = ({ user }) => {
    const [hide, setHide] = useState(true);
    const [processing, setProcess] = useState(false);

    const { data, setData } = useForm({
        nip: "",
        no_hp: "",
        image: null,
        name: "",
        username: "",
        old_password: "",
        new_password: "",
        confirm_password: "",
    });

    const setValue = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setData({
            ...data,
            name: user.name,
            nip: user.NIP,
            no_hp: user.no_hp,
            username: user.username,
        });
    }, [user]);

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);
        const response = await PostData(
            route("update_profile"),
            data,
            "multipart/form-data"
        );

        if (response) {
            setProcess(false);
            router.get("profile");
        }
        setProcess(false);
    };

    return (
        <form
            className="flex flex-col gap-4 w-full mt-4 px-5 pb-5"
            onSubmit={submit}
            // ref={form}
            encType="multipart/form-data"
            autoComplete="off"
        >
            {user.role ? (
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
                        autoComplete="off"
                        id="username"
                        name="username"
                        value={data.username}
                        onChange={(e) => setValue(e)}
                        placeholder="Ganti username"
                        className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
            ) : (
                <>
                    <div className="w-full">
                        <label
                            htmlFor="nip"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            NIP
                        </label>
                        <span className="bg-transparent capitalize dark:bg-transparent block text-start px-1">
                            {data.nip ? data.nip : "-"}
                        </span>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="no_hp"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            No HP
                        </label>
                        <input
                            type="text"
                            name="no_hp"
                            id="no_hp"
                            maxLength={13}
                            value={data.no_hp}
                            onChange={(e) => setValue(e)}
                            placeholder="Masukkan no hp"
                            className="w-full rounded-md border capitalize text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </>
            )}
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
                    value={data.name}
                    onChange={(e) => setValue(e)}
                    placeholder="Ganti nama"
                    className="w-full rounded-md capitalize border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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

            <div className="w-full">
                <h5 className="capitalize text-danger text-xs">
                    * kosongkan old password, new password & confirm password
                    jika tidak ingin diganti!
                </h5>
                <label
                    htmlFor="old_password"
                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                >
                    Old Password
                </label>
                <div className="relative w-full">
                    <input
                        type={hide ? "password" : "text"}
                        name="old_password"
                        onChange={(e) => setValue(e)}
                        value={data.old_password}
                        autoComplete="off"
                        id="old_password"
                        placeholder="Masukkan new password"
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
            <div className="w-full">
                <label
                    htmlFor="new_password"
                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                >
                    New Password
                </label>
                <div className="relative w-full">
                    <input
                        type={hide ? "password" : "text"}
                        name="new_password"
                        onChange={(e) => setValue(e)}
                        value={data.new_password}
                        autoComplete="off"
                        id="new_password"
                        placeholder="Masukkan new password"
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
            <div className="w-full">
                <label
                    htmlFor="confirm_password"
                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                >
                    Confirm Password
                </label>
                <div className="relative w-full">
                    <input
                        type={hide ? "password" : "text"}
                        name="confirm_password"
                        onChange={(e) => setValue(e)}
                        value={data.confirm_password}
                        autoComplete="off"
                        id="confirm_password"
                        placeholder="Confirm password"
                        className={`${
                            data.confirm_password &&
                            data.new_password !== data.confirm_password &&
                            "!border-danger"
                        } relative w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                    <div
                        onClick={() => setHide(!hide)}
                        className="absolute top-3.5 right-4 cursor-pointer text-body hover:text-black dark:hover:text-white"
                    >
                        {hide ? <PiEyeLight /> : <PiEyeSlash />}
                    </div>
                </div>
                {data.confirm_password &&
                    data.new_password !== data.confirm_password && (
                        <span className="text-xs text-danger">
                            Confirm password tidak sama!
                        </span>
                    )}
                <div className="w-full mt-3 text-end">
                    <a
                        href={route("forgot_password")}
                        className="underline text-black text-sm dark:text-white"
                    >
                        Lupa Password?
                    </a>
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
                        Update Data
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProfileUpdate;
