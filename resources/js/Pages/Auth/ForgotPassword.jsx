import logo from "@/assets/images/icon-bps.png";
import DarkModeSwitcher from "@/Components/Dashboard/El/DarkModeSwitcher";
import Footer from "@/Components/Dashboard/Footer";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
    const [processing, setProcess] = useState(false);
    const [user, setUser] = useState([]);

    const { data, setData, reset } = useForm({
        nip: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);
        const loading = toast.loading("Loading...");

        const response = await axios.post(route("get_user"), data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.data) {
            reset();
            setProcess(false);
            toast.success(response.data.message, {
                id: loading,
                duration: 3000,
            });
            setUser(response.data.user);
        }

        setProcess(false);
        toast.error(response.data.message, {
            id: loading,
            duration: 3000,
        });
    };

    const handleValue = (e) => {
        setData({
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Head title="Lupa Password" />
            <div className="w-full h-screen flex justify-center items-center bg-whiten dark:bg-boxdark-2 dark:text-bodydark">
                <div className="w-full fixed left-0 top-0 flex justify-end items-center container py-3 max-xsm:px-3">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        {/* <!-- Dark Mode Toggler --> */}
                        <DarkModeSwitcher />
                        {/* <!-- Dark Mode Toggler --> */}
                    </ul>
                </div>
                <div className="w-1/2">
                    <div className="w-full mb-3 pb-2 border-b border-stroke dark:border-strokedark flex justify-between items-center">
                        <a
                            href="/"
                            className="inline-flex overflow-hidden w-20 h-auto"
                        >
                            <img
                                className="w-full h-auto"
                                src={logo}
                                alt="BPS 3208"
                                loading="lazy"
                            />
                        </a>
                        <h1 className="text-end capitalize font-bold text-xl text-black dark:text-white">
                            Lupa password
                        </h1>
                    </div>
                    <div className="bg-white dark:bg-boxdark dark:border-strokedark border-stroke shadow-sm rounded-md p-5">
                        {!user.length ? (
                            <form
                                onSubmit={submit}
                                className="flex flex-col justify-start gap-4 w-full items-start"
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
                                        autoComplete="nip"
                                        id="nip"
                                        name="nip"
                                        required
                                        onChange={(e) => handleValue(e)}
                                        placeholder="Masukkan NIP anda"
                                        className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                            Cari Data
                                        </button>
                                    )}
                                </div>
                            </form>
                        ) : (
                            <></>
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
