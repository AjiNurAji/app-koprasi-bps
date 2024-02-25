import { BiEdit } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";

const ActionTable = ({ id }) => {
    return (
        <div className="flex justify-center items-center space-x-3.5">
            <a href={`/edit/${id}`} className="hover:text-primary text-lg">
                <BiEdit />
            </a>
            <button className="hover:text-meta-1 text-lg">
                <BsTrash3 />
            </button>
        </div>
    );
};

export default ActionTable;
