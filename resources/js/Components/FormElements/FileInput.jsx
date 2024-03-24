import FileSize from "@/Libs/FileSize";
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
                    <div className="w-full flex flex-col overflow-y-auto justify-center items-start gap-3">
                        {Object.entries(data).map((item, i) => (
                            <div
                                key={i}
                                className="flex xsm:flex-row flex-col w-full gap-2 h-auto justify-center xsm:justify-start items-center px-2 py-1 shadow-md rounded-md bg-stroke dark:bg-strokedark"
                            >
                                <div className="w-10 h-10">
                                    {item[1].type.includes("image") ? (
                                        <svg
                                            viewBox="0 0 14 14"
                                            role="img"
                                            focusable="false"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
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
                                                <g transform="translate(.14285704 .14285704) scale(.28571)">
                                                    {" "}
                                                    <path
                                                        fill="#90caf9"
                                                        d="M40 13v32H8V3h22z"
                                                    ></path>{" "}
                                                    <path
                                                        fill="#e1f5fe"
                                                        d="M38.5 14H29V4.5z"
                                                    ></path>{" "}
                                                    <path
                                                        fill="#1565c0"
                                                        d="M21 23l-7 10h14z"
                                                    ></path>{" "}
                                                    <path
                                                        fill="#1976d2"
                                                        d="M28 26.4L23 33h10z"
                                                    ></path>{" "}
                                                    <circle
                                                        cx="31.5"
                                                        cy="24.5"
                                                        r="1.5"
                                                        fill="#1976d2"
                                                    ></circle>{" "}
                                                </g>{" "}
                                            </g>
                                        </svg>
                                    ) : item[1].type.includes("pdf") ? (
                                        <svg
                                            fill="#8C181A"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
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
                                                <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"></path>
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z"></path>
                                            </g>
                                        </svg>
                                    ) : item[1].type.includes("word") ? (
                                        <svg
                                            fill="#259AE6"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
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
                                                <path d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"></path>
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"></path>
                                                <path d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"></path>
                                            </g>
                                        </svg>
                                    ) : item[1].type.includes("text/plain") ? (
                                        <svg
                                            fill="#FFA70B"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
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
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.998 14.768H8.895v3.274h-.917v-3.274H6.893V14h3.105v.768zm2.725 3.274-.365-.731c-.15-.282-.246-.492-.359-.726h-.013c-.083.233-.185.443-.312.726l-.335.731h-1.045l1.171-2.045L10.336 14h1.05l.354.738c.121.245.21.443.306.671h.013c.096-.258.174-.438.276-.671l.341-.738h1.043l-1.139 1.973 1.198 2.069h-1.055zm4.384-3.274h-1.104v3.274h-.917v-3.274h-1.085V14h3.105v.768zM14 9h-1V4l5 5h-4z"></path>
                                            </g>
                                        </svg>
                                    ) : item[1].type.includes("sheet") ? (
                                        <svg
                                            fill="#1D6F42"
                                            viewBox="0 0 1024 1024"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon"
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
                                                <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM575.34 477.84l-61.22 102.3L452.3 477.8a12 12 0 0 0-10.27-5.79h-38.44a12 12 0 0 0-6.4 1.85 12 12 0 0 0-3.75 16.56l82.34 130.42-83.45 132.78a12 12 0 0 0-1.84 6.39 12 12 0 0 0 12 12h34.46a12 12 0 0 0 10.21-5.7l62.7-101.47 62.3 101.45a12 12 0 0 0 10.23 5.72h37.48a12 12 0 0 0 6.48-1.9 12 12 0 0 0 3.62-16.58l-83.83-130.55 85.3-132.47a12 12 0 0 0 1.9-6.5 12 12 0 0 0-12-12h-35.7a12 12 0 0 0-10.29 5.84z"></path>{" "}
                                            </g>
                                        </svg>
                                    ) : item[1].type.includes("audio") ? (
                                        <svg
                                            viewBox="0 0 48 48"
                                            version="1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            enableBackground="new 0 0 48 48"
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
                                                <rect
                                                    x="204"
                                                    fill="none"
                                                    width="48"
                                                    height="48"
                                                ></rect>{" "}
                                                <polygon
                                                    fill="#90CAF9"
                                                    points="244,45 212,45 212,3 234,3 244,13"
                                                ></polygon>{" "}
                                                <polygon
                                                    fill="#E1F5FE"
                                                    points="242.5,14 233,14 233,4.5"
                                                ></polygon>{" "}
                                                <g fill="#1976D2">
                                                    {" "}
                                                    <circle
                                                        cx="227"
                                                        cy="30"
                                                        r="4"
                                                    ></circle>{" "}
                                                    <polygon points="234,21 229,19 229,30 231,30 231,22.9 234,24"></polygon>{" "}
                                                </g>{" "}
                                                <polygon
                                                    fill="#90CAF9"
                                                    points="40,45 8,45 8,3 30,3 40,13"
                                                ></polygon>{" "}
                                                <polygon
                                                    fill="#E1F5FE"
                                                    points="38.5,14 29,14 29,4.5"
                                                ></polygon>{" "}
                                                <g fill="#1976D2">
                                                    {" "}
                                                    <circle
                                                        cx="23"
                                                        cy="30"
                                                        r="4"
                                                    ></circle>{" "}
                                                    <polygon points="30,21 25,19 25,30 27,30 27,22.9 30,24"></polygon>{" "}
                                                </g>{" "}
                                            </g>
                                        </svg>
                                    ) : item[1].type.includes("video") ? (
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            className="icon"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
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
                                                <path
                                                    d="M853.333333 960H170.666667V64h469.333333l213.333333 213.333333z"
                                                    fill="#90CAF9"
                                                ></path>
                                                <path
                                                    d="M821.333333 298.666667H618.666667V96z"
                                                    fill="#E1F5FE"
                                                ></path>
                                                <path
                                                    d="M640 597.333333l-213.333333-128v256z"
                                                    fill="#1976D2"
                                                ></path>
                                            </g>
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            className="icon"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
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
                                                <path
                                                    d="M853.333333 960H170.666667V64h469.333333l213.333333 213.333333z"
                                                    fill="#90CAF9"
                                                ></path>
                                                <path
                                                    d="M821.333333 298.666667H618.666667V96z"
                                                    fill="#E1F5FE"
                                                ></path>
                                            </g>
                                        </svg>
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
