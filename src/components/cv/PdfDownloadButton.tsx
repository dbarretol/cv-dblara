import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const PdfDownloadButton = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <Button
      id="pdf-download-btn"
      onClick={handleDownload}
      variant="outline"
      className="fixed top-4 right-4 z-50 gap-2 shadow-md border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors print:hidden"
      aria-label="Descargar CV en PDF"
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">Descargar PDF</span>
    </Button>
  );
};

export default PdfDownloadButton;
