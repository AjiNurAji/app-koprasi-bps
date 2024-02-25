import { MdOutlineRemoveRedEye, MdOutlineFileDownload } from "react-icons/md";

const ActionButton = ({ id }) => {
    return (
        <div className="flex justify-center items-center space-x-3.5">
            <a href={`${route('pinjaman_anggota')}/${id}`} className="hover:text-primary text-lg">
                <MdOutlineRemoveRedEye />
            </a>
            <button className="hover:text-success text-lg">
                <MdOutlineFileDownload />
            </button>
        </div>
    );
};

export default ActionButton;
