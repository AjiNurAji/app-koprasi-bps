import { useEffect, useRef, useState } from "react";

const SelectWithSearch = ({ data, value, setData, step }) => {
    const [active, setActive] = useState(false);
    const [member, setMember] = useState([...data]);
    const dropdown = useRef(null);
    const trigger = useRef(null);

    const MEMBERS = member.filter(
        (fil) =>
            fil.name &&
            fil.name.toLowerCase().includes(value.name.toLowerCase())
    );

    useEffect(() => {
        if (MEMBERS.length === 1) {
            return setData({
                ...value,
                id_member: MEMBERS[0].id_member,
            });
        }
        return setData({
            ...value,
            id_member: undefined,
        });
    }, [value.name]);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !active ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            if (
                !dropdown.current.contains(target) ||
                !trigger.current.contains(target)
            ) {
                setActive(false);
            }
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!active || keyCode !== 27) return;
            setActive(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    const handleValue = (e, v) => {
        e.preventDefault();
        setData({
            ...value,
            name: v.name,
            id_member: v.id_member,
        });
        setActive(false);
    };

    return (
        <div className="relative">
            <input
                type="text"
                id="namaLengkap"
                name="name"
                ref={trigger}
                required
                disabled={
                    (value.id_member && step >= 2)
                        ? true
                        : false
                }
                autoComplete="off"
                value={value.name}
                onChange={(e) =>
                    setData({
                        ...value,
                        name: e.target.value,
                    })
                }
                onFocus={() => setActive(true)}
                placeholder="Masukkan nama lengkap anggota"
                className="w-full dark:disabled:bg-transparent disabled:bg-transparent disabled:border-none disabled:px-1 rounded-md border text-dark dark:text-white border-stroke bg-transparent py-2 pl-4 pr-6 transition-all duration-300 ease-in-out outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            <div
                ref={dropdown}
                onBlur={() => setActive(false)}
                onFocus={() => setActive(true)}
                className={`absolute z-999 h-auto max-h-45 overflow-y-auto right-0 mt-1 flex w-full flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                    active === true ? "block" : "hidden"
                }`}
            >
                <div className="flex flex-col gap-0.5 border-b border-stroke p-2 dark:border-strokedark">
                    {member.length === 0 ? (
                        <div className="w-full text-start text-black dark:text-white">
                            Tidak ada data anggota
                        </div>
                    ) : (
                        <>
                            {MEMBERS.length === 0 ? (
                                <div className="w-full text-start text-black dark:text-white">
                                    Data tidak ditemukan
                                </div>
                            ) : (
                                <>
                                    {MEMBERS.map((item) => (
                                        <div
                                            key={item.id_member}
                                            className="w-full text-start text-black hover:bg-black hover:bg-opacity-5 dark:text-white py-1.5 px-3 rounded-md cursor-pointer"
                                            onClick={(e) =>
                                                handleValue(e, item)
                                            }
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectWithSearch;
