import ExcelDownloaderComponent from "@/components/excel-downloader";

export default function DelegateManagementPage() {
  return (
    <div className="container mx-auto py-8 pt-8">
      <h1 className="text-3xl font-bold mb-6">Delegate Management</h1>
      <ExcelDownloaderComponent />
    </div>
  );
}
