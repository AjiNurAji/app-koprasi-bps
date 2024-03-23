// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import "@react-pdf-viewer/core/lib/styles/index.css";

import { useEffect, useRef, useState } from "react";
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
            {/* <iframe className="w-full h-full" src={url}></iframe> */}
            {/* <div className="overflow-y-auto h-auto w-full">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
                </Worker>
            </div> */}
            <div className="w-full h-full" ref={pdfWrapper}></div>
        </div>
    );
};

export default PreviewPDF;
