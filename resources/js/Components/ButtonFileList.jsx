import { BiUpload } from "react-icons/bi";

const ButtonFileList = ({ setPopup, setType }) => {
    return (
        <div className="flex justify-end items-center gap-4 max-sm:w-full">
            <button className="p-2 pr-3 hover:bg-opacity-95 flex justify-center items-center gap-2 transition-all w-full xsm:w-max duration-300 ease-in-out bg-primary text-white rounded-md text-xl"
                onClick={() => {
                    setPopup(true)
                    setType("file")
                }}
            >
                <BiUpload /> <span className="text-sm">Upload File</span>
            </button>
        </div>
    )
}

export default ButtonFileList;