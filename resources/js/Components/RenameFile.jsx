import { MdClose } from "react-icons/md";
import ButtonLoading from "./ButtonLoading";
import { useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import PostData from "@/Libs/postData";

const RenameFile = ({ id, filename, setPopup }) => {
    const [processing, setProcess] = useState(false);
    const { data, setData } = useForm({
        new_file: "",
        extension: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const response = await PostData(route("rename_file", id), data);

        if (response) {
            setPopup(false);
            setProcess(false);
            router.get("laporan-rat");
        }

        setProcess(false);
    };

    useEffect(() => {
        setData({
            new_file: filename.split(".")[0],
            extension: filename.split(".")[1],
        });
    }, [filename]);

    const setValue = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="fixed z-9999 h-screen w-full top-0 left-0 right-0 overflow-hidden bg-black bg-opacity-20 dark:bg-opacity-60 flex justify-center items-center">
            <div className="rounded-md border mb-4 sm:mb-6 border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark w-11/12 lg:w-1/2">
                <div className="flex jutify-between w-full gap-5 mb-3 items-center">
                    <h1 className="font-bold w-full text-xl">Ganti Nama</h1>
                    <div
                        className="h-5 w-5 text-black cursor-pointer dark:text-white hover:text-danger"
                        onClick={() => setPopup(false)}
                    >
                        <MdClose className="w-full h-full" />
                    </div>
                </div>
                <form className="w-full flex flex-col gap-3" onSubmit={submit}>
                    <div className="w-full">
                        <input
                            type="text"
                            autoComplete="off"
                            id="new_file"
                            name="new_file"
                            value={data.new_file}
                            onChange={(e) => setValue(e)}
                            placeholder="Nama file"
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
                                Ganti
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RenameFile;
