import { useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import Logo from "@/assets/images/icon-bps.png";
import Checkbox from "@/Components/FormElements/Checkbox";
import ProcessLogin from "@/Libs/processLogin";
import { router } from "@inertiajs/react";
import ButtonLoading from "@/Components/ButtonLoading";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import BoxIlus from "@/Components/FormElements/BoxIlus";

const Login = () => {
    const [processing, setProcess] = useState(false);
    const [hide, setHide] = useState(true);
    const { data, setData } = useForm({
        username: "",
        password: "",
        remember: false,
    });
    const inputUsername = useRef(null);
    const form = useRef(null);

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const prosess = await ProcessLogin(route("login_admin"), data);

        if (prosess) {
            form.current.reset();
            setProcess(false);
            router.get(route("dashboard"));
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
        <>
            <Head title="Log in" />
            <div className="flex items-center justify-between min-h-screen w-full">
                <BoxIlus />
                <div className="md:basis-1/2 basis-full h-screen flex justify-center items-center bg-white dark:bg-boxdark-2">
                    <div className="flex justify-center items-center flex-col gap-3 w-full">
                        <div className="flex justify-center items-center flex-col gap-2">
                            <div className="w-20 h-auto overflow-hidden">
                                <img className="w-full" src={Logo} alt="Logo" />
                            </div>
                            <h1 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Login
                            </h1>
                        </div>
                        <form
                            ref={form}
                            onSubmit={submit}
                            method="post"
                            className="flex flex-col justify-start gap-6 w-full items-start"
                        >
                            <div className="w-full">
                                <label
                                    htmlFor="username"
                                    className="mb-2.5 font-medium text-black dark:text-white"
                                >
                                    Username or Email
                                </label>
                                <input
                                    type="text"
                                    autoComplete="username"
                                    id="username"
                                    name="username"
                                    ref={inputUsername}
                                    required
                                    onChange={(e) => handleValue(e)}
                                    placeholder="Masukkan username atau email anda"
                                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="password"
                                    className="mb-2.5 font-medium text-black dark:text-white"
                                >
                                    Password
                                </label>
                                <div className="relative w-full">
                                    <input
                                        type={hide ? "password" : "text"}
                                        name="password"
                                        required
                                        onChange={(e) => handleValue(e)}
                                        autoComplete="current-password"
                                        id="password"
                                        placeholder="Masukkan password anda"
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
                            <div className="flex justify-between items-center w-full">
                                <Checkbox data={data} setData={setData} />
                                <a href="" className="text-black hover:text-primary dark:hover:text-primary dark:text-bodydark">Forgot Password?</a>
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
                                        Login
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
