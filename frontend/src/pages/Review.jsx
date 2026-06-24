import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ActionButtons from "../components/ActionButtons";
import { ClipLoader } from "react-spinners";

export default function Review() {

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReview = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:8000/literature-review"
      );

      setReview(
        res.data?.review ||
        "No review generated."
      );

      toast.success("Review Generated!");

    } catch(error){

      console.error(error);

      toast.error(
        "Failed to generate review."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-10 max-w-7xl mx-auto">

      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
        <b className="text-blue-600">Literature Review Generator</b>
      </h1>

      <p className="text-lg text-slate-700 mb-8">
        Generate a comprehensive literature review from indexed papers.
      </p>

      <button
        onClick={generateReview}
        disabled={loading}
        className="
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
          cursor-pointer
          disabled:opacity-50
        "
      >

        {
          loading
          ? <ClipLoader size={18} color="white" />
          : "Generate Review"
        }

      </button>

      <ActionButtons
        content={review}
        filename="literature-review.pdf"
      />

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-8
          mt-6
          min-h-[300px]
        "
      >
        <pre className="whitespace-pre-wrap text-slate-700">
          {review}
        </pre>
      </div>

    </div>

  );
}