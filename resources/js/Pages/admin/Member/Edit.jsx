import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LuArrowLeft } from "react-icons/lu";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useState } from "react";
import ButtonLoading from "@/Components/ButtonLoading";
import PostData from "@/Libs/postData";
import { router } from "@inertiajs/react";

const EditMember = ({ auth, member }) => {
    const [processing, setProcess] = useState(false);
    const [hide, setHide] = useState(true);
    const { data, setData } = useForm({
        id_member: "",
        nip: "",
        name: "",
        no_hp: "",
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
            id_member: member.id_member,
            name: member.name,
            nip: member.NIP,
            no_hp: member.no_hp,
        });
    }, [member]);

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const prosess = await PostData(route("update_member"), data);

        if (prosess) {
            setProcess(false);
            router.get(route("members"));
        }

        setProcess(false);
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={`Edit Member`} />
            <Breadcrumb pageName={`Edit ${member.name}`} />
            <div className="flex justify-start items-center">
                <a
                    href={route("members")}
                    className="click_animation bg-danger text-white py-2 px-3 rounded-md inline-block"
                >
                    <LuArrowLeft />
                </a>
            </div>
            <div className="rounded-md my-4 md:my-6 w-full flex-auto relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <form
                    className="grid grid-cols-1 gap-4 md:gap-6"
                    onSubmit={submit}
                >
                    <div className="w-full">
                        <label
                            htmlFor="nip"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            NIP
                        </label>
                        <input
                            type="text"
                            name="nip"
                            id="nip"
                            value={data.nip}
                            onChange={(e) => setValue(e)}
                            placeholder="Masukkan NIP anggota"
                            className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="name"
                            className="mb-2.5 inline-block font-medium text-black dark:text-white"
                        >
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setValue(e)}
                            placeholder="Masukkan nama anggota"
                            className="w-full rounded-md border capitalize text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
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
                            placeholder="Masukkan no hp anggota"
                            className="w-full rounded-md border capitalize text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>

                    <div className="w-full">
                        <h5 className="capitalize text-danger text-xs">
                            * kosongkan new password & confirm password jika
                            tidak ingin diganti!
                        </h5>
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
                                className={`${data.confirm_password && data.new_password !== data.confirm_password && "!border-danger"} relative w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                            />
                            <div
                                onClick={() => setHide(!hide)}
                                className="absolute top-3.5 right-4 cursor-pointer text-body hover:text-black dark:hover:text-white"
                            >
                                {hide ? <PiEyeLight /> : <PiEyeSlash />}
                            </div>
                        </div>
                        {data.confirm_password && data.new_password !== data.confirm_password && (
                            <span className="text-xs text-danger">
                                Confirm password tidak sama!
                            </span>
                        )}
                    </div>

                    <div className="w-full">
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
        </Authenticated>
    );
};

export default EditMember;
