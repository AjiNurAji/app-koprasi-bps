import { BiEdit } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";

const ActionTable = ({ memberId }) => {
    return (
        <div className="flex items-center space-x-3.5">
            <a href={`/edit/${memberId}`} className="hover:text-primary text-lg">
                <BiEdit />
            </a>
            <button className="hover:text-meta-1 text-lg">
                <BsTrash3 />
            </button>
        </div>
    );
};

export default ActionTable;
