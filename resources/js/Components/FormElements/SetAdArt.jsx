import PostData from "@/Libs/postData";
import FileInput from "./FileInput";
import { useForm, router } from "@inertiajs/react";
import { useState } from "react";
import ButtonLoading from "../ButtonLoading";

const SetAdArt = () => {
    const [processing, setProcess] = useState(false);

    const { data, setData, reset } = useForm({
        file: null,
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcess(true);

        const response = PostData(
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
            <div className="w-full">
                {processing ? (
                    <ButtonLoading color="primary" />
                ) : (
                    <button
                        type="submit"
                        name="button-sumbit"
                        className="w-full cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                    >
                        Kirim
                    </button>
                )}
            </div>
        </form>
    );
};

export default SetAdArt;
