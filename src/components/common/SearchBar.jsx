import React from "react";
import { Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons";
import "@ui5/webcomponents-icons/dist/feeder-arrow";
import "@ui5/webcomponents-icons/dist/lightbulb";

const SearchBar = ({ mutate, setUserInput }) => {
    const onSubmit = (event) => {
      event.preventDefault();
      const content = event.target.querySelector("input").value;
      setUserInput(content);
      if (mutate({ content })) {
        event.target.querySelector("input").value = "";
      }
    };
  
    const handleSuggestions = ({ content }) => {
      mutate({ content });
      setUserInput(content);
    };
  
    return (
      <article className="w-full">
        <div className="mx-auto text-base max-w-4xl px-6 pb-2">
        {/* Main Search Form */}
        <form className="relative mb-6" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Something you want to learn?"
            className="w-full border-search border-4 py-3 md:py-4 px-5 md:px-10 rounded-full bg-white text-sea placeholder-search  focus:outline-none font-bold text-sm md:text-lg"
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
          <button onClick={() => handleSuggestions({content: 'Act like an Python expert and tell me how to learn python programming'})} className="px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3 hover:scale-105 cursor-pointer transition-all duration-300">
            Learn Python programming
          </button>
          <button onClick={() => handleSuggestions({content: 'Act like an Web Development Expert and tell me how to learn web development basics'})} className="px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3 hover:scale-105 cursor-pointer transition-all duration-300">
            Web development basics
          </button>
          <button onClick={() => handleSuggestions({content: 'Act like an Digital Marketing Expert and tell me how to learn Digital marketing'})} className="px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3 hover:scale-105 cursor-pointer transition-all duration-300">
            Digital marketing
          </button>
          <button onClick={() => handleSuggestions({content: 'Act like an Machine learning Expert and tell me how to learn Machine learning'})} className="px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3 hover:scale-105 cursor-pointer transition-all duration-300">
            Machine learning
          </button>
        </div>
        </div>
      </article>
    );
  };

export {
    SearchBar
}