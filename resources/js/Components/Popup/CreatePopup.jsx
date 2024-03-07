import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRef, useEffect } from "react";

const CreatePopup = ({ createName, setPopup, form, popup }) => {
    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!popup || keyCode !== 27) return;
            setPopup(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <div className="fixed bg-black dark:bg-opacity-60 bg-opacity-30 top-0 right-0 w-full min-h-screen h-max flex justify-center items-center z-9999 overflow-y-auto px-5 overflow-x-hidden">
            <div
                className="flex absolute bg-white border dark:bg-boxdark dark:border-strokedark border-stroke p-5 rounded-md flex-col w-auto mx-5 md:mx-0"
            >
                <div className="mb-6 gap-10 flex justify-between items-center">
                    <h2 className="capitalize text-title-md2 font-semibold text-black dark:text-white">
                        {createName}
                    </h2>
                    <button
                        className="w-fit cursor-pointer rounded-md border border-meta-1 bg-meta-1 p-2 text-lg text-white transition hover:bg-opacity-90"
                        onClick={() => setPopup(false)}
                    >
                        <AiOutlineCloseCircle />
                    </button>
                </div>
                {form ? form : null}
            </div>
        </div>
    );
};

export default CreatePopup;
