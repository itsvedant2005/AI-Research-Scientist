import {
  FileText,
  MessageSquare,
  BookOpen,
  Search,
  Lightbulb
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const stats = [
    {
      title: "PDFs Indexed",
      value: "1+",
      icon: <FileText size={28} />,
      color: "bg-blue-500"
    },
    {
      title: "Questions Asked",
      value: "∞",
      icon: <MessageSquare size={28} />,
      color: "bg-green-500"
    },
    {
      title: "Reviews",
      value: "Ready",
      icon: <BookOpen size={28} />,
      color: "bg-purple-500"
    },
    {
      title: "Research Gaps",
      value: "Ready",
      icon: <Search size={28} />,
      color: "bg-orange-500"
    },
    {
      title: "Proposals",
      value: "Ready",
      icon: <Lightbulb size={28} />,
      color: "bg-pink-500"
    }
  ];

  return (

    <div className="p-10">

      <div className="
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        text-white
        p-10
        rounded-3xl
        shadow-xl
        mb-8
      ">

        <h1 className="text-5xl font-bold">
          AI Research Scientist
        </h1>

        <p className="mt-4 text-lg opacity-90">
          Upload papers, analyze research, generate reviews and discover research gaps.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {stats.map((card, index) => (

          <div
            key={index}
            className="
              bg-white
              rounded-3xl
              p-6
              border
              border-slate-200
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-2
              transition-all
              duration-300
              cursor-pointer
            "
          >

            <div
              className={`
                ${card.color}
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center
                text-white
                mb-4
              `}
            >
              {card.icon}
            </div>

            <h3 className="text-lg font-semibold text-slate-700">
              {card.title}
            </h3>

            <p className="text-3xl font-bold text-slate-900 mt-2">
              {card.value}
            </p>

          </div>

        ))}

      </div>

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/upload")}
            className="
              bg-gradient-to-r
              from-blue-600
              to-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              shadow-lg
              hover:scale-105
              transition-all
              cursor-pointer
            "
          >
            Upload Paper
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="
              bg-gradient-to-r
              from-green-600
              to-green-700
              text-white
              px-6
              py-3
              rounded-xl
              shadow-lg
              hover:scale-105
              transition-all
              cursor-pointer
            "
          >
            Ask Question
          </button>

          <button
            onClick={() => navigate("/review")}
            className="
              bg-gradient-to-r
              from-purple-600
              to-purple-700
              text-white
              px-6
              py-3
              rounded-xl
              shadow-lg
              hover:scale-105
              transition-all
              cursor-pointer
            "
          >
            Generate Review
          </button>

        </div>

      </div>

      <div className="
        mt-10
        bg-white
        rounded-3xl
        p-8
        border
        border-slate-200
        shadow-sm
      ">

        <h2 className="text-2xl font-bold mb-6">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>✅ Upload & Index Research Papers</div>
          <div>✅ Chat With PDFs Using RAG</div>
          <div>✅ Generate Literature Reviews</div>
          <div>✅ Find Research Gaps</div>
          <div>✅ Generate Research Proposals</div>
          <div>✅ Download, Copy & Share Results</div>

        </div>

      </div>

    </div>

  );
}