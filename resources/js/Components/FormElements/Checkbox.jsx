import { useEffect, useState } from "react";

const Checkbox = ({ data, setData }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (isChecked) {
            setData({
                ...data,
                remember: true,
            })
        } else {
            setData({
                ...data,
                remember: false,
            })
        }
    }, [isChecked])

    return (
        <div>
            <label
                htmlFor="remember"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id="remember"
                        className="sr-only"
                        onChange={() => {
                            setIsChecked(!isChecked);
                        }}
                    />
                    <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                            isChecked &&
                            "border-primary bg-gray dark:bg-transparent"
                        }`}
                    >
                        <span
                            className={`h-2.5 w-2.5 rounded-sm ${
                                isChecked && "bg-primary"
                            }`}
                        ></span>
                    </div>
                </div>
                Remember me
            </label>
        </div>
    );
};

export default Checkbox;
