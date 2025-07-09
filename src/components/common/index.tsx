import React, { useState } from "react";
import "@ui5/webcomponents-icons/dist/AllIcons";
import "@ui5/webcomponents-icons/dist/activities";
import "@ui5/webcomponents-icons/dist/activity-items";
import "@ui5/webcomponents-icons/dist/map-3";
import "@ui5/webcomponents-icons/dist/decline";
import "@ui5/webcomponents-icons/dist/menu";
import { Icon } from "@ui5/webcomponents-react";
import { Link, useLocation, useParams } from "react-router";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-learnSidebar md:min-h-screen md:w-learn p-5 font-sans text-white grid grid-cols-2 md:grid-cols-none md:grid-rows-2 shadow-md">
      {/* header */}
      <div className="w-[120%] md:w-[100%] flex flex-col gap-1 text-xl text-balance md:text-2xl">
        <h1>Welcome to Learn AI</h1>
        <p>This is a prototype</p>
      </div>
      {/* Hamburger Button for mobile */}
      <div className="md:hidden flex justify-end">
        <button
          className="md:hidden px-10 rounded-lg bg-white h-[60%] py-2 focus:outline-none focus:ring-2 focus-within:ring-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <Icon name={isMenuOpen ? "decline" : "menu"} className="w-5 h-5" />
        </button>
      </div>
      {/* navigation */}
      <nav
        className={`
                flex-col gap-5 text-balance w-full transition-all duration-300 ease-in-out

                // Mobile Specific Styling for Overlay
                fixed md:static top-0 right-0 bg-learnSidebar
                overflow-y-auto md:overflow-visible
                max-w-[70%] md:max-w-none p-5

                // Transition Classes
                ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100 visible right-2 top-30 z-50 rounded-lg shadow-lg"
                    : "translate-x-full opacity-0 invisible bg-transparent md:opacity-100 md:translate-x-0 md:visible"
                }
                `}
      >
        <ul className="mb-5">
          <Link
            to="/"
            className={`text-white text-lg hover:text-gray-300 transition-colors duration-300 ${
              pathname === "/" && "bg-learnbg p-2.5 rounded-lg shadow-md"
            }`}
          >
            <Icon
              name="activities"
              className="align-middle text-white w-5 h-5 mr-3"
            ></Icon>
            Ask Something
          </Link>
        </ul>
        <ul className="mb-5">
          <Link
            to="/roadmap"
            className={`text-white text-lg hover:text-gray-300 transition-colors duration-300 ${
              pathname === "/roadmap" && "bg-learnbg p-2.5 rounded-lg shadow-md"
            }`}
          >
            <Icon
              name="map-3"
              className="align-middle text-white w-5 h-5 mr-3"
            ></Icon>
            RoadMap Chat
          </Link>
        </ul>
        <ul className="mb-5">
          <Link
            to="/history"
            className={`text-white text-lg hover:text-gray-300 transition-colors duration-300 ${
              pathname === "/history" && "bg-learnbg p-2.5 rounded-lg shadow-md"
            }`}
          >
            <Icon
              name="activity-items"
              className="align-middle text-white w-5 h-5 mr-3"
            ></Icon>
            History
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export { Sidebar };
