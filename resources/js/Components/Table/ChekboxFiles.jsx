import { useEffect, useRef } from "react";

const CheckboxFiles = ({ indeterminate, ...rest }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            className="rounded-md click_animation w-4 h-4 border-stroke checked:bg-primary dark:checked:bg-primary dark:bg-black dark:border-strokedark cursor-pointer "
            ref={ref}
            {...rest}
        />
    );
};

export default CheckboxFiles;
