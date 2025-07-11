import React from "react";
import { Routes, Route } from "react-router-dom";

import { Sidebar } from "./components/common";
import { Home } from "./components/home";
import { RoadMap } from "./components/pages/RoadMap";
import { History } from "./components/pages/History";

const App = () => {
  return (
    // using flex to create a responsive layout with sidebar and main content
    <main className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      {/* //using flex grow to allow the main content to take up remaining space */}
      <div className="flex-1 bg-learnbg">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </main>
  );
};

export { App };
