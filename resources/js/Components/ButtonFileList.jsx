import { BiFolderPlus, BiUpload } from "react-icons/bi";

const ButtonFileList = () => {
    return (
        <div className="flex justify-end items-center gap-4">
            <button className="p-2 pr-3 hover:bg-opacity-95 flex justify-center items-center gap-2 transition-all w-max duration-300 ease-in-out bg-primary text-white rounded-md text-xl">
                <BiFolderPlus /> <span className="text-sm">Buat Folder</span>
            </button>
            <button className="p-2 pr-3 hover:bg-opacity-95 flex justify-center items-center gap-2 transition-all w-max duration-300 ease-in-out bg-primary text-white rounded-md text-xl">
                <BiUpload /> <span className="text-sm">Upload File</span>
            </button>
        </div>
    )
}

export default ButtonFileList;