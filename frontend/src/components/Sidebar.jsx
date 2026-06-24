import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BookOpen,
  Search,
  Lightbulb
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/"
    },
    {
      name: "Upload PDF",
      icon: <FileText size={20} />,
      path: "/upload"
    },
    {
      name: "Chat",
      icon: <MessageSquare size={20} />,
      path: "/chat"
    },
    {
      name: "Literature Review",
      icon: <BookOpen size={20} />,
      path: "/review"
    },
    {
      name: "Research Gap",
      icon: <Search size={20} />,
      path: "/gap"
    },
    {
      name: "Proposal Generator",
      icon: <Lightbulb size={20} />,
      path: "/proposal"
    }
  ];

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white p-6 shadow-2xl">

      <div className="mb-10">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Research
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Research Assistant Platform
        </p>

      </div>

      <div className="space-y-3">

        {menuItems.map((item, index) => (

          <Link
            key={index}
            to={item.path}
            className={`
              flex items-center gap-3
              p-4
              rounded-xl
              transition-all
              duration-300
              ${
                location.pathname === item.path
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800"
              }
            `}
          >
            {item.icon}
            {item.name}
          </Link>

        ))}

      </div>

    </div>
  );
}