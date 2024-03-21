import FileInput from "./FileInput";
import { useForm } from "@inertiajs/react";

const SetAdArt = () => {

    const { data, setData } = useForm({
        file: null,
    });

    const submit = (e) =>{
        e.preventDefault();
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={submit}>
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
        </form>
    )
}

export default SetAdArt;