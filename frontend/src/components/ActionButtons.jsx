import toast from "react-hot-toast";
import jsPDF from "jspdf";

export default function ActionButtons({
  content,
  filename
}) {

  const downloadPDF = () => {

  const pdf = new jsPDF();

  pdf.setFontSize(12);

  const lines = pdf.splitTextToSize(content, 180);
pdf.text(lines, 10, 10);

  pdf.save(
    filename.replace(".txt", ".pdf")
  );
};

  const copyContent = () => {

    navigator.clipboard.writeText(
      content
    );

    toast.success(
      "Copied Successfully!"
    );
  };

  const downloadContent = () => {

    const blob = new Blob(
      [content],
      {
        type: "text/plain"
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = filename;

    link.click();

    toast.success(
      "Downloaded Successfully!"
    );
  };

  const shareContent = async () => {

    try {

      await navigator.share({
        title: "AI Research Scientist",
        text: content
      });

    } catch (error) {

      console.log(error);
    }
  };

  if (!content) return null;

  return (

    <div className="flex gap-3 mt-5 flex-wrap">

      <button
        onClick={copyContent}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
          cursor-pointer
        "
      >
        📋 Copy
      </button>

      <button
  onClick={downloadPDF}
  className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-4
    py-2
    rounded-lg
    cursor-pointer
  "
>
  📄 Download PDF
</button>

      <button
        onClick={shareContent}
        className="
          bg-purple-600
          hover:bg-purple-700
          text-white
          px-4
          py-2
          rounded-lg
          cursor-pointer
        "
      >
        📤 Share
      </button>

    </div>
  );
}