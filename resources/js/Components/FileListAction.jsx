import { BsTrash3 } from "react-icons/bs";
import { BiRename, BiDotsVerticalRounded } from "react-icons/bi";
import { MdDownload } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

const FileListAction = () => {
    const [button, setbutton] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", (e) => {
            e.preventDefault();
            if (!buttonRef.current.contains(e.target)) {
                setbutton(false);
            }
        });
    }, []);

    return (
        <div className="flex w-full py-2 px-0 sm:px-4 justify-start items-center gap-0 sm:gap-4">
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
                        <button className="hover:text-primary click_animation text-xs">
                            <BiRename />
                        </button>
                        <button className="hover:text-danger click_animation text-xs">
                            <BsTrash3 />
                        </button>
                        <button className="hover:text-danger click_animation text-xs">
                            <MdDownload />
                        </button>
                    </div>
                )}
            </div>
            <button className="hover:text-primary click_animation text-lg max-sm:hidden">
                <BiRename />
            </button>
            <button className="hover:text-danger click_animation text-lg max-sm:hidden">
                <BsTrash3 />
            </button>
            <button className="hover:text-danger click_animation text-lg max-sm:hidden">
                <MdDownload />
            </button>
        </div>
    );
};

export default FileListAction;
