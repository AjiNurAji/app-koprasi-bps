import PostData from "@/Libs/postData";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const FormJasaAnggota = () => {
    const [processing, setProcess] = useState(false);
    const { data, setData } = useForm({
        persentase: null,
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

    return (
        <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="w-full">
                <label
                    htmlFor="persentase"
                    className="mb-2.5 font-medium text-black dark:text-white"
                >
                    Persentase
                </label>
                <input
                    type="number"
                    autoComplete="persentase"
                    id="persentase"
                    name="persentase"
                    required
                    min={0}
                    max={100}
                    onChange={(e) => handleValue(e)}
                    placeholder="Persentase jasa anggota"
                    className="w-full rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
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

export default FormJasaAnggota;
