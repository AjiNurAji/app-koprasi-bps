import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import ButtonLoading from "./ButtonLoading";
import FileInput from "./FormElements/FileInput";
import PostData from "@/Libs/postData";
import { router } from "@inertiajs/react";

const UploadFile = ({ setPopup }) => {
    const [processing, setProcess] = useState(false);
    const [files, setFiles] = useState([]);

    const { data, setData, reset } = useForm({
        files: null,
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const response = await PostData(
            route("upload_file"),
            data,
            "multipart/form-data"
        );
        if (response) {
            reset();
            setProcess(false);
            setPopup(false);
            router.get(route("laporan_rat"));
        }

        setProcess(false);
    };

    useEffect(() => {
        setData({
            ...data,
            files: files,
        });
    }, [files]);

    return (
        <div className="fixed z-9999 h-screen w-full top-0 left-0 right-0 overflow-hidden bg-black bg-opacity-20 dark:bg-opacity-60 flex justify-center items-center">
            <div className="rounded-md border mb-4 sm:mb-6 border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark w-11/12 lg:w-1/2">
                <div className="flex jutify-between w-full gap-5 mb-3 items-center">
                    <h1 className="font-bold w-full text-xl">Upload File</h1>
                    <div
                        className="h-5 w-5 text-black cursor-pointer dark:text-white hover:text-danger"
                        onClick={() => setPopup(false)}
                    >
                        <MdClose className="w-full h-full" />
                    </div>
                </div>
                <form className="w-full flex flex-col gap-3" onSubmit={submit}>
                    <FileInput
                        data={files}
                        setData={setFiles}
                        multiple={true}
                        max_size={99999999999}
                    />
                    <div className="w-full">
                        {processing ? (
                            <ButtonLoading color="primary" />
                        ) : (
                            <button
                                type="submit"
                                name="button-sumbit"
                                className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Upload File
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadFile;
