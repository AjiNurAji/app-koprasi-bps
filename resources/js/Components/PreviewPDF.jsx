import { useEffect, useRef } from "react";
import { embed } from "pdfobject";

const PreviewPDF = ({ url }) => {
    const pdfWrapper = useRef(null);

    useEffect(() => {
        embed(url, pdfWrapper.current, {
            pdfOpenParams: {
                pagemode: "thumbs",
            },
            forcePDFJS: true,
            PDFJS_URL: "/pdfjs/web/viewer.html"
        });
    }, [url])
    return (
        <div className="w-full h-230 mt-6 overflow-hidden rounded-md">
            <div className="w-full h-full" ref={pdfWrapper}></div>
        </div>
    );
};

export default PreviewPDF;
