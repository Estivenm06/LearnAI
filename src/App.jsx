import React from "react";
import { Routes, Route } from "react-router-dom";

import { Sidebar } from "./components/common";
import { Home } from "./components/home";
import { RoadMap } from "./components/pages/RoadMap";
import { History } from "./components/pages/History";

const App = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
};

export { App };
