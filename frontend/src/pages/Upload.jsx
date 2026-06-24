import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Upload() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {

    if (!file) {
      toast.error("Please select a PDF first");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      const res = await axios.post(
        "http://localhost:8000/index-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success(
        `PDF Indexed Successfully (${res.data.chunks} chunks)`
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to upload PDF."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-10 max-w-7xl mx-auto">

      <h1 className="text-4xl font-extrabold mb-2">
        <span className="text-blue-600">
          Document Intelligence Hub
        </span>
      </h1>

      <p className="text-lg text-slate-700 mb-8">
        Upload, index, and analyze research documents using AI.
      </p>

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-8
          max-w-3xl
        "
      >

        <input
          type="file"
          accept=".pdf"
          className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            cursor-pointer
          "
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        {file && (

          <div className="mt-4">

            <p className="font-medium text-slate-700">
              📄 {file.name}
            </p>

          </div>

        )}

        <button
          onClick={uploadFile}
          disabled={loading}
          className="
            mt-5
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            text-white
            px-6
            py-3
            rounded-xl
            shadow-lg
            hover:scale-105
            transition-all
            duration-300
            cursor-pointer
            disabled:opacity-50
          "
        >

          {
            loading
              ? "Indexing PDF..."
              : "Upload & Index PDF"
          }

        </button>

      </div>

    </div>

  );
}