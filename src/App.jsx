import React from "react";
import { Routes, Route } from "react-router-dom";

import { SideBar } from "./components/common/SideBar";
import { Home } from "./components/home";
import { RoadMap } from "./components/pages/RoadMap";

const App = () => {
  return (
    <>
      <SideBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/roadmap" element={<RoadMap />} />
        </Routes>
    </>
  );
};

export { App };
