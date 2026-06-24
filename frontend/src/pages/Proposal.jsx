import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ActionButtons from "../components/ActionButtons";

export default function Proposal() {

  const [topic, setTopic] = useState("");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);

  const generateProposal = async () => {

    if (!topic.trim()) {

      toast.error(
        "Please enter a research topic."
      );

      return;
    }

    try {

      setLoading(true);

      const res = await axios.get(
        `http://localhost:8000/proposal?topic=${encodeURIComponent(topic)}`
      );

      setProposal(
        res.data?.proposal ||
        "No proposal generated."
      );

      toast.success(
        "Proposal Generated!"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to generate proposal."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-10 max-w-7xl mx-auto">

      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
        <b className="text-green-600">Research Proposal Generator</b>
      </h1>

      <p className="text-lg text-slate-700 mb-8">
        Create complete research proposals using AI.
      </p>

      <input
        className="
          w-full
          border
          border-slate-300
          rounded-xl
          p-4
          focus:ring-2
          focus:ring-green-500
          focus:outline-none
        "
        placeholder="Enter Research Topic..."
        value={topic}
        onChange={(e)=>
          setTopic(e.target.value)
        }
      />

      <button
        onClick={generateProposal}
        disabled={loading}
        className="
          mt-5
          bg-gradient-to-r
          from-green-600
          to-emerald-600
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
            ? "Generating..."
            : "Generate Proposal"
        }

      </button>

      <ActionButtons
        content={proposal}
        filename="research-proposal.pdf"
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
          {proposal}
        </pre>

      </div>

    </div>

  );
}