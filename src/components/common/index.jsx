import React, { useState } from "react";
import "@ui5/webcomponents-icons/dist/AllIcons";
import "@ui5/webcomponents-icons/dist/activities";
import "@ui5/webcomponents-icons/dist/activity-items";
import "@ui5/webcomponents-icons/dist/map-3";
import "@ui5/webcomponents-icons/dist/decline";
import "@ui5/webcomponents-icons/dist/menu";
//D-modifify
import "@ui5/webcomponents-icons/dist/feeder-arrow";
import "@ui5/webcomponents-icons/dist/lightbulb";
//D-modifify
import { Icon } from "@ui5/webcomponents-react";
import { Link, useLocation } from "react-router";

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
                gap-5 text-balance transition-all duration-300 ease-in-out

                // Mobile Specific Styling for Overlay
                fixed md:static top-0 right-0 bg-learnSidebar md:bg-transparent
                overflow-y-auto md:overflow-visible p-5 w-full

                // Transition Classes
                ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100 visible top-20 z-50 md:shadow-none"
                    : "translate-x-full opacity-0 invisible md:opacity-100 md:translate-x-0 md:visible"
                }
                `}
      >
        <ul className="mb-5">
          <Link
            to="/"
            className={`p-2.5 rounded-lg text-white text-lg hover:text-gray-300 transition-colors duration-300 ${
              pathname === "/" && "bg-learnbg shadow-md"
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
            className={`p-2.5 rounded-lg text-white text-lg hover:text-gray-300 transition-colors duration-300 ${
              pathname === "/roadmap" && "bg-learnbg shadow-md"
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
            className={`p-2.5 rounded-lg text-white text-lg hover:text-gray-300 transition-colors duration-300 ${
              pathname === "/history" && "bg-learnbg shadow-md"
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

const SearchBar = ({ mutate }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const content = event.target.querySelector('input').value    
    if(mutate({ content })){
      event.target.querySelector('input').value = '';
    };
  }

  return (
    <article className="w-full max-w-4xl p-6 mb-10 mx-auto">
      {/* Main Search Form */}
      <form className="relative mb-6" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Something you want to learn?"
          className="w-full border-search border-4 py-4 px-10 rounded-full bg-white text-sea placeholder-search  focus:outline-none font-bold md:text-lg"
        />
        <button
          type="submit"
          className="absolute right-3 inset-y-0 my-auto w-10 h-10 flex items-center justify-center hover:cursor-pointer hover:bg-search hover:rounded-full transition-all duration-300"
        >
          <Icon
            name="feeder-arrow"
            className="w-8 h-8 md:w-10 md:h-10 text-search hover:text-white transition-colors duration-300"
          />
        </button>
      </form>

      {/* Quick Suggestions */}
      <div className="flex items-center gap-2 text-gray-300 mb-3">
        <Icon name="lightbulb" className="w-4 h-4 fill-white" />
        <span className="text-md font-semibold">Quick suggestions:</span>
      </div>
      <div className="flex flex-wrap gap-1.5 items-center text-balance">
        <button className="px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3">
          Learn Python programming
        </button>
        <button className="px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3">
          Web development basics
        </button>
        <button className="px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3">
          Digital marketing
        </button>
        <button className="px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3">
          Machine learning
        </button>
      </div>
    </article>
  );
};

export { Sidebar, SearchBar };
