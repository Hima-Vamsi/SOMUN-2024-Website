"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";

const PdfViewer = ({ url }: { url: string }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      fullScreenPlugin: {
        onEnterFullScreen: () => {
          return SpecialZoomLevel.PageFit;
        },
        onExitFullScreen: () => {
          return SpecialZoomLevel.PageFit;
        },
      },
    },
  });

  return (
    <div className="h-screen w-screen">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={url}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={1}
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;
