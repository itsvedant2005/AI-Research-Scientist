import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Review from "./pages/Review";
import ResearchGap from "./pages/ResearchGap";
import Proposal from "./pages/Proposal";

import { Toaster } from "react-hot-toast";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (

    <BrowserRouter>

      <div className="flex bg-slate-50 min-h-screen">

        <Sidebar />

        <div className="flex-1">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/upload"
              element={<Upload />}
            />

            <Route
              path="/chat"
              element={<Chat />}
            />

            <Route
              path="/review"
              element={<Review />}
            />

            <Route
              path="/gap"
              element={<ResearchGap />}
            />

            <Route
              path="/proposal"
              element={<Proposal />}
            />

          </Routes>

        </div>

        <Toaster position="top-right" />

      </div>

    </BrowserRouter>

  );
}

export default App;