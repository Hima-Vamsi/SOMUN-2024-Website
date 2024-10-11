export default function PDFViewer() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        SOMUN 2024 Terms and Conditions
      </h1>
      <iframe
        src="/SOMUN 2024 Terms and Conditions.pdf"
        className="w-full max-w-4xl h-[80vh] border rounded-lg shadow-lg"
        title="SOMUN 2024 Terms and Conditions"
      />
    </div>
  );
}
