import { BsTrash3 } from "react-icons/bs";
import { BiRename, BiDotsVerticalRounded } from "react-icons/bi";
import { MdDownload } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import RenameFile from "./RenameFile";
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import PostData from "@/Libs/postData";

const FileListAction = ({ id, path, filename }) => {
    const [button, setbutton] = useState(false);
    const buttonRef = useRef(null);
    const bDownload = useRef(null);
    const bDelete = useRef(null);
    const bRename = useRef(null);
    const [rename, setRename] = useState(false);
    const [yesOrNo, setYesOrNo] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (document.body.clientWidth < 640) {
                document.addEventListener("click", (e) => {
                    if (
                        !buttonRef.current?.contains(e.target) &&
                        !bDownload.current?.contains(e.target) &&
                        !bDelete.current?.contains(e.target) &&
                        !bRename.current?.contains(e.target)
                    ) {
                        setbutton(false);
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        const widthDefault = document.body.clientWidth;

        if (widthDefault < 640) {
            document.addEventListener("click", (e) => {
                if (
                    !buttonRef.current?.contains(e.target) &&
                    !bDownload.current?.contains(e.target) &&
                    !bDelete.current?.contains(e.target) &&
                    !bRename.current?.contains(e.target)
                ) {
                    setbutton(false);
                }
            });
        }
    }, []);

    const fileDelete = async (e) => {
        e.preventDefault();
        toast.loading(
            (t) => (
                <div className="flex flex-col items-center justify-start gap-2">
                    <span className="text-lg">Apakah anda yakin?</span>
                    <div className="flex w-full items-center justify-center gap-2">
                        <button
                            className="bg-success w-full rounded-md px-3 py-1 text-white text-sm"
                            onClick={() => {
                                setYesOrNo(true);
                                toast.dismiss(t.id);
                            }}
                        >
                            Yakin
                        </button>
                        <button
                            className="bg-danger w-full rounded-md px-3 py-1 text-white text-sm"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Batal
                        </button>
                    </div>
                </div>
            ),
            {
                icon: null,
                className: "dark:bg-boxdark dark:text-white",
            }
        );
    };

    const process = async () => {
        if (!yesOrNo) return;

        const loading = toast.loading("Loading...", {
            className: "dark:bg-boxdark dark:text-white",
        });
        const response = await axios.delete(route("file_delete", id));

        if (response.data) {
            toast.success(response.data.message, {
                id: loading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white",
            });
            setYesOrNo(false);
            router.get("laporan-rat");
        } else {
            setYesOrNo(false);
            toast.error(response.message, {
                id: loading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white",
            });
        }
    };

    useEffect(() => {
        process();
    }, [yesOrNo]);

    return (
        <div className="flex w-full py-2 px-0 sm:px-4 justify-start items-center gap-0 sm:gap-4">
            {rename && (
                <RenameFile id={id} setPopup={setRename} filename={filename} />
            )}
            <div className="sm:hidden relative">
                <button
                    className="hover:text-primary click_animation text-lg"
                    ref={buttonRef}
                    onClick={() => setbutton(!button)}
                >
                    <BiDotsVerticalRounded />
                </button>

                {button && (
                    <div className="flex absolute right-5 top-0 gap-3 w-max shadow-md rounded-md border border-stroke dark:border-strokedark bg-white dark:bg-boxdark px-2 py-1">
                        <button
                            className="hover:text-primary click_animation text-sm"
                            ref={bRename}
                            onClick={() => setRename(true)}
                        >
                            <BiRename />
                        </button>
                        <button
                            className="hover:text-danger click_animation text-sm"
                            ref={bDelete}
                            onClick={fileDelete}
                        >
                            <BsTrash3 />
                        </button>
                        <a
                            href={path}
                            download={filename}
                            ref={bDownload}
                            className="hover:text-danger click_animation text-sm"
                        >
                            <MdDownload />
                        </a>
                    </div>
                )}
            </div>
            <button
                className="hover:text-primary click_animation text-lg max-sm:hidden"
                onClick={() => setRename(true)}
            >
                <BiRename />
            </button>
            <button
                className="hover:text-danger click_animation text-lg max-sm:hidden"
                onClick={fileDelete}
            >
                <BsTrash3 />
            </button>
            <a
                href={path}
                download={filename}
                className="hover:text-danger click_animation text-lg max-sm:hidden"
            >
                <MdDownload />
            </a>
        </div>
    );
};

export default FileListAction;
