import PostData from "@/Libs/postData";
import FileInput from "./FileInput";
import { useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ButtonLoading from "../ButtonLoading";
import { toast } from "react-hot-toast";

const SetAdArt = () => {
    const [processing, setProcess] = useState(false);
    const [error, setError] = useState(null);

    const { data, setData, reset } = useForm({
        file: null,
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const response = await PostData(
            route("ad_art_set"),
            data,
            "multipart/form-data"
        );

        if (response) {
            reset();
            setProcess(false);
            router.get(route("ad-art"));
        }

        setProcess(false);
    };

    useEffect(() => {
        if (!data.file) return setError(null);

        if (!data.file?.type.includes("pdf")) {
            toast.error("File harus berbentuk PDF!", { className: "dark:bg-boxdark dark:text-white" })
            return setError("File harus berbentuk PDF!")
        };
        setError(null);
    }, [data.file])

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={submit}
            encType="multipart/form-data"
        >
            <FileInput
                label="Ubah atau Tambahkan file AD/ART"
                fileType="PDF"
                max="200MB"
                accept=".pdf"
                name={"file"}
                data={data}
                setData={setData}
                max_size={209715200}
            />
            {!data.file?.type.includes("pdf") && (
                <small className="text-danger text-sm">{error}</small>
            )}
            <div className="w-full">
                {processing ? (
                    <ButtonLoading color="primary" />
                ) : (
                    <button
                        type="submit"
                        name="button-sumbit"
                        disabled={!data.file?.type.includes("pdf")}
                        className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:bg-opacity-90"
                    >
                        Kirim
                    </button>
                )}
            </div>
        </form>
    );
};

export default SetAdArt;
