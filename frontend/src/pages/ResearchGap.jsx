import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ActionButtons from "../components/ActionButtons";

export default function ResearchGap({ darkMode }) {

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateGap = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:8000/research-gap"
      );

      setResult(
        res.data?.research_gaps ||
        "No research gaps found."
      );

      toast.success(
        "Research Gap Generated!"
      );

    } catch (error) {

      console.error(error);

      const msg =
        error?.response?.data?.research_gaps ||
        error?.response?.data?.detail ||
        "";

      if (
        msg.includes("quota") ||
        msg.includes("429")
      ) {

        toast.error(
          "API Limit Reached. Try again later."
        );

        return;
      }

      toast.error(
        "Failed to generate research gaps."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-5">
        <b className="text-purple-600">Research Gap Finder</b>
      </h1>

      <p className="text-lg text-slate-700 mb-8">
  Discover hidden opportunities, research limitations, and potential future directions using AI-powered analysis.
</p>

      <button
        onClick={generateGap}
        disabled={loading}
        className="
          bg-purple-600
          hover:bg-purple-700
          text-white
          px-5
          py-2
          rounded-lg
          cursor-pointer
          transition
          disabled:opacity-50
        "
      >

        <ActionButtons
  content={result}
  filename="research-gap.txt"
/>
        {
          loading
          ? "Analyzing..."
          : "Find Gaps"
        }
      </button>

     
  <div className="mt-6 bg-white text-slate-900 p-6 rounded-xl shadow">
        <pre className="whitespace-pre-wrap text-gray-700">
          {result}
        </pre>

      </div>

    </div>
  );
}