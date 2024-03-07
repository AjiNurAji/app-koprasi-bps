import { BiHome } from "react-icons/bi";

const Breadcrumb = ({ pageName }) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 capitalize font-semibold text-black dark:text-white">
                {pageName}
            </h2>

            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <a href={route('dashboard')} className="flex items-center gap-1">
                          <BiHome className="w-5 h-auto" />  Dashboard /
                        </a>
                    </li>
                    <li className="text-primary capitalize">{pageName}</li>
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
