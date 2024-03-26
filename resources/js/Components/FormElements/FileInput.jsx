import FileSize from "@/Libs/FileSize";
import { useEffect, useRef, useState } from "react";
import {
    BsFillFileEarmarkExcelFill,
    BsFillFileEarmarkFill,
    BsFillFileEarmarkImageFill,
    BsFillFileEarmarkMusicFill,
    BsFillFileEarmarkPdfFill,
    BsFillFileEarmarkPlayFill,
    BsFillFileEarmarkSlidesFill,
    BsFillFileEarmarkTextFill,
    BsFillFileEarmarkWordFill,
} from "react-icons/bs";
import { GrClearOption } from "react-icons/gr";
import { ImSvg } from "react-icons/im";

const FileInput = ({
    fileType,
    max,
    accept,
    name,
    data,
    setData,
    label,
    note,
    max_size,
    multiple = false,
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

        const fileSize = FileSize(file[0].size);

        return setSize(fileSize);
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

            if (multiple) setData(files);
        });
    }, []);

    return (
        <div className="w-full relative">
            {label && (
                <label
                    htmlFor="dropzone-file"
                    className="mb-2.5 inline-block font-medium text-black dark:text-white"
                >
                    {label}
                    {note && (
                        <span className="text-danger font-normal text-xs">
                            {` * ${note}`}
                        </span>
                    )}
                </label>
            )}
            <label
                htmlFor="dropzone-file"
                ref={dropzone}
                className={`flex flex-col items-center justify-center w-full h-auto border-2 ${
                    file === undefined
                        ? "border-stroke dark:border-strokedark"
                        : file[0].size < max_size
                        ? "!border-meta-3"
                        : "!border-meta-1"
                } border-dashed rounded-md cursor-pointer dark:bg-black hover:bg-stroke dark:hover:bg-black dark:hover:bg-opacity-60 hover:bg-opacity-25 ${
                    active ? "!border-primary bg-stroke bg-opacity-25" : null
                }`}
            >
                <div className="flex flex-col w-full relative items-center justify-center pt-5 pb-6">
                    {!multiple ? (
                        <>
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
                                            strokLinecap="round"
                                            L
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
                                        <>
                                            {file[0].type.includes("image") && (
                                                <span className="w-40 h-auto mb-3">
                                                    <img
                                                        className="w-full h-auto"
                                                        src={preview}
                                                        alt={file[0].name}
                                                    />
                                                </span>
                                            )}

                                            {file[0].type.includes("pdf") && (
                                                <span className="w-20 h-auto mb-3">
                                                    <svg
                                                        className="w-full h-auto"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 56 64"
                                                        enableBackground="new 0 0 56 64"
                                                        xmlSpace="preserve"
                                                        fill="#000000"
                                                    >
                                                        <g
                                                            id="SVGRepo_bgCarrier"
                                                            strokeWidth="0"
                                                        ></g>
                                                        <g
                                                            id="SVGRepo_tracerCarrier"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            {" "}
                                                            <g>
                                                                {" "}
                                                                <path
                                                                    fill="#8C181A"
                                                                    d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"
                                                                ></path>{" "}
                                                                <path
                                                                    fill="#6B0D12"
                                                                    d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"
                                                                ></path>{" "}
                                                                <path
                                                                    opacity="0.5"
                                                                    fill="#FFFFFF"
                                                                    enableBackground="new "
                                                                    d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"
                                                                ></path>{" "}
                                                            </g>{" "}
                                                            <path
                                                                fill="#FFFFFF"
                                                                d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"
                                                            ></path>{" "}
                                                        </g>
                                                    </svg>
                                                </span>
                                            )}
                                        </>
                                    )}
                                    <p className="mb-2 text-sm text-center px-5 text-gray-500 dark:text-gray-400">
                                        {file[0].name}
                                    </p>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        {size}
                                    </p>
                                </>
                            )}
                        </>
                    ) : (
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
                        </>
                    )}
                </div>
                <input
                    id="dropzone-file"
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => {
                        if (multiple) {
                            return setData(e.target.files);
                        }

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
            {multiple && data.length ? (
                <div className="w-full h-45 overflow-x-hidden rounded-md pr-2 mt-3">
                    <div className="w-full flex flex-col justify-center items-start gap-3">
                        {Object.entries(data).map((item, i) => (
                            <div
                                key={i}
                                className="flex xsm:flex-row flex-col w-full gap-2 h-auto justify-center xsm:justify-start items-center px-2 py-1 shadow-md rounded-md bg-stroke dark:bg-strokedark"
                            >
                                {console.log(item)}
                                <div className="w-10 h-10">
                                    {item[1].type.includes("svg") ? (
                                        <span className="w-full h-full inline-block text-primary text-xl">
                                            <ImSvg className="w-full h-full" />
                                        </span>
                                    ) : item[1].type.includes("image") ? (
                                        <span className="w-full h-full inline-block text-primary text-xl">
                                            <BsFillFileEarmarkImageFill className="w-full h-full" />
                                        </span>
                                    ) : item[1].type.includes("sheet") ||
                                      item[1].type.includes("excel") ? (
                                        <span className="w-full h-full inline-block text-success text-xl">
                                            <BsFillFileEarmarkExcelFill className="w-full h-full"  />
                                        </span>
                                    ) : item[1].type.includes("word") ? (
                                        <span className="w-full h-full inline-block text-meta-5 text-xl">
                                            <BsFillFileEarmarkWordFill className="w-full h-full"  />
                                        </span>
                                    ) : item[1].type.includes(
                                          "text/plain"
                                      ) ? (
                                        <span className="w-full h-full inline-block text-primary text-xl">
                                            <BsFillFileEarmarkTextFill className="w-full h-full"  />
                                        </span>
                                    ) : item[1].type.includes("pdf") ? (
                                        <span className="w-full h-full inline-block text-danger text-xl">
                                            <BsFillFileEarmarkPdfFill className="w-full h-full"  />
                                        </span>
                                    ) : item[1].type.includes("audio") ? (
                                        <span className="w-full h-full inline-block text-primary text-xl">
                                            <BsFillFileEarmarkMusicFill className="w-full h-full"  />
                                        </span>
                                    ) : item[1].type.includes("video") ? (
                                        <span className="w-full h-full inline-block text-primary text-xl">
                                            <BsFillFileEarmarkPlayFill className="w-full h-full"  />
                                        </span>
                                    ) : item[1].type.includes(
                                          "presentation"
                                      ) ||
                                      item[1].type.includes(
                                          "powerpoint"
                                      ) ? (
                                        <span className="w-full h-full inline-block text-warning text-xl">
                                            <BsFillFileEarmarkSlidesFill className="w-full h-full"  />
                                        </span>
                                    ) : (
                                        <span className="w-full h-full inline-block text-primary text-xl">
                                            <BsFillFileEarmarkFill className="w-full h-full"  />
                                        </span>
                                    )}
                                </div>
                                <div className="w-full xsm:text-start text-center break-words text-sm">
                                    {item[1].name}
                                </div>
                                <div className="w-30 break-words text-sm">
                                    {FileSize(item[1].size)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
            {file || data.length ? (
                <button
                    type="button"
                    className="absolute top-10 right-2 cursor-pointer rounded-md border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 w-fit"
                    onClick={() => {
                        setFile(undefined);
                        setPreview(undefined);
                        setSize(undefined);
                        multiple
                            ? setData({
                                  files: null,
                              })
                            : setData({
                                  ...data,
                                  file: null,
                              });
                    }}
                >
                    <GrClearOption />
                </button>
            ) : null}
        </div>
    );
};

export default FileInput;
