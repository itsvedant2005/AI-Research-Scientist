import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import ActionButtons from "../components/ActionButtons";

import {
  MessageSquare
} from "lucide-react";

export default function Chat() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {

    if (!question.trim()) {

      toast.error(
        "Please enter a question."
      );

      return;
    }

    try {

      setLoading(true);

      const res = await axios.get(
        `http://localhost:8000/ask-rag?question=${encodeURIComponent(question)}`
      );

      setAnswer(
        res.data?.answer ||
        "No answer found."
      );

      toast.success(
        "Answer Generated!"
      );

    } catch (error) {

      console.error(error);

      const msg =
        error?.response?.data?.answer ||
        "";

      if (
        msg.includes("quota") ||
        msg.includes("429")
      ) {

        toast.error(
          "API Limit Reached."
        );

        return;
      }

      toast.error(
        "Failed to get answer."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
  <b className="text-blue-600">Chat With Research Paper</b>
</h1>

<p className="text-lg text-slate-700 mb-8">
  Ask intelligent questions and get AI-powered answers from your indexed documents.
</p>

      <div className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        p-8
      ">

        <div className="flex gap-3">

          <input
            className="
              flex-1
              border
              border-slate-300
              rounded-xl
              p-4
              focus:ring-2
              focus:ring-green-500
              focus:outline-none
            "
            placeholder="Ask a question..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="
              bg-gradient-to-r
              from-green-600
              to-emerald-600
              text-white
              px-6
              rounded-xl
              hover:scale-105
              transition-all
              duration-300
              cursor-pointer
              disabled:opacity-50
            "
          >

            {
              loading
                ? "Thinking..."
                : "Ask"
            }

          </button>

        </div>

      </div>

      {answer && (

        <div className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-8
          mt-6
        ">

          <div className="flex items-center gap-3 mb-4">

            <MessageSquare
              size={22}
              className="text-green-600"
            />

            <h2 className="font-bold text-xl">
              AI Answer
            </h2>

          </div>

          <div className="
            whitespace-pre-wrap
            text-slate-700
            leading-relaxed
          ">
            {answer}
          </div>

          <ActionButtons
            content={answer}
            filename="chat-answer.pdf"
          />

        </div>

      )}

    </div>

  );
}