import { useEffect, useRef, useState } from "react";
import { GrClearOption } from "react-icons/gr";

const FileInput = ({
    fileType,
    max,
    accept,
    name,
    data,
    setData,
    label,
    note,
}) => {
    const fileRef = useRef(null);
    const dropzone = useRef(null);
    const [file, setFile] = useState();
    const [active, setActive] = useState(false);
    const [size, setSize] = useState("");
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!file) return;
        const objectUrl = URL.createObjectURL(file[0]);

        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    useEffect(() => {
        if (!file) return;
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(file[0].size) / Math.log(k));

        return setSize(
            parseFloat((file[0].size / Math.pow(k, i)).toFixed(2)) +
                " " +
                sizes[i]
        );
    }, [file]);

    useEffect(() => {
        dropzone?.current.addEventListener("dragover", (e) => {
            e.preventDefault();
            setActive(true);
        });

        dropzone?.current.addEventListener("dragleave", () => {
            setActive(false);
        });

        dropzone?.current.addEventListener("drop", (e) => {
            e.preventDefault();
            setActive(false);

            const files = e.dataTransfer.files;
            setFile(files);
        });
    }, []);

    // console.log()

    return (
        <div className="w-full relative">
            <label
                htmlFor="dropzone-file"
                className="mb-2.5 inline-block font-medium text-black dark:text-white"
            >
                {label}
                {note ? (
                    <span className="text-meta-1 text-xs">
                       {" "}({note})
                    </span>
                ) : null}
            </label>
            <label
                htmlFor="dropzone-file"
                ref={dropzone}
                className={`flex flex-col items-center justify-center w-full h-auto border-2 ${
                    file === undefined
                        ? "border-stroke dark:border-strokedark"
                        : file[0].size < 2048576
                        ? "!border-meta-3"
                        : "!border-meta-1"
                } border-dashed rounded-md cursor-pointer dark:bg-black hover:bg-stroke dark:hover:bg-black dark:hover:bg-opacity-60 hover:bg-opacity-25 ${
                    active ? "!border-primary bg-stroke bg-opacity-25" : null
                }`}
            >
                <div className="flex flex-col w-full relative items-center justify-center pt-5 pb-6">
                    {file === undefined ? (
                        <>
                            <svg
                                className="w-8 h-8 mb-4 text-primary"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {`${fileType} (MAX. ${max})`}
                            </p>
                        </>
                    ) : (
                        <>
                            {preview && (
                                <span className="w-60 h-auto mb-3">
                                    <img
                                        className="w-full h-auto"
                                        src={preview}
                                        alt={file[0].name}
                                    />
                                </span>
                            )}
                            <p className="mb-2 text-sm text-center px-5 text-gray-500 dark:text-gray-400">
                                {file[0].name}
                            </p>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                {size}
                            </p>
                        </>
                    )}
                </div>
                <input
                    id="dropzone-file"
                    name={name}
                    accept={accept}
                    onChange={(e) => {
                        setFile(e.target.files);
                        setData({
                            ...data,
                            [e.target.name]: e.target.files[0],
                        });
                    }}
                    type="file"
                    ref={fileRef}
                    className="hidden"
                />
            </label>
            {file ? (
                <button
                    type="button"
                    className="absolute top-10 right-2 cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 w-fit"
                    onClick={() => {
                        fileRef.current.value = null;
                        setFile(undefined);
                        setPreview(undefined);
                        setSize(undefined);
                    }}
                >
                    <GrClearOption />
                </button>
            ) : null}
        </div>
    );
};

export default FileInput;
