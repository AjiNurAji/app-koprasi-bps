import { AiOutlineCloseCircle } from "react-icons/ai";

const CreatePopup = ({ createName, setPopup, form }) => {
    return (
        <div className="fixed bg-black bg-opacity-30 top-0 right-0 w-full min-h-screen flex justify-center items-center z-9999">
            <div className="flex bg-white border dark:bg-boxdark dark:border-strokedark border-stroke p-5 rounded-md flex-col w-11/12 md:w-1/2">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
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
