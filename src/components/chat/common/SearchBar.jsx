import React, { useState } from "react";
import { Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons";
import "@ui5/webcomponents-icons/dist/feeder-arrow";
import "@ui5/webcomponents-icons/dist/media-pause";
import "@ui5/webcomponents-icons/dist/information";
import "@ui5/webcomponents-icons/dist/lightbulb";

import { ButtonSgn } from "../../ButtonSuggestion";
import {
  ButtonFormatNotSelected,
  ButtonFormatSelected,
} from "../../ButtonFormat";

const SearchBar = ({ mutate, setUserInput, loading }) => {
  const [format, setFormat] = useState("Guide");

  const suggestions = [
    "Learn Python programming",
    "Web development basics",
    "Digital marketing",
    "Machine learning",
  ];
  const onSubmit = (event) => {
    event.preventDefault();
    const inputUser = event.target.querySelector("input").value;
    if (inputUser.trim() === "") {
      alert("The input is empty.");
      return;
    }
    const content = format === 'Guide' ? 'Make a comprehensive guide in depth if has code send it all of this with relevant information of this: ' + inputUser : 'Make a well build it RoadMap with relevant information in depth with courses, code if its need it and more about this: ' + inputUser;
    setUserInput(inputUser);
    if (mutate({ content })) {
      event.target.querySelector("input").value = "";
    }
  };

  const handleSuggestions = ({content}) => {
    setUserInput(content);
    const contentWithFormat = format === 'Guide' ? 'Make a comprehensive guide in depth if has code send it all of this with relevant information of this: ' + content : 'Make a well build it RoadMap with relevant information in depth with courses, code if its need it and more about this: ' + content;
    mutate({ content: contentWithFormat });
  };

  const handleFormat = (format) => setFormat(format);

  return (
    <article className="w-sm sm:w-full text-base px-6 pb-2">
        {/* Main Search Form */}
        <form className="relative" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Something you want to learn?"
            className="w-full border-search border-4 py-3 md:py-4 px-5 md:px-10 rounded-full bg-white text-sea placeholder-search  focus:outline-none font-bold text-sm md:text-lg"
          />
          {loading ? (
            <>
              <button
                className="absolute right-3 inset-y-0 my-auto w-10 h-10 flex items-center justify-center cursor-default rounded-full transition-all duration-300"
                disabled={true}
              >
                <Icon
                  name="media-pause"
                  className="w-8 h-8 md:w-10 md:h-10 text-search transition-colors duration-300"
                />
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="absolute right-3 inset-y-0 my-auto w-10 h-10 flex items-center justify-center hover:cursor-pointer hover:bg-search hover:rounded-full transition-all duration-300"
                disabled={false}
              >
                <Icon
                  name="feeder-arrow"
                  className="w-8 h-8 md:w-10 md:h-10 text-search hover:text-white transition-colors duration-300"
                />
              </button>
            </>
          )}
        </form>
        {/* Format AI Response*/}
        <div className="flex flex-col my-2">
          <span className="text-md font-semibold text-gray-300 items-center flex justify-start mb-2">
            <Icon className="mr-1 w-4 h-4 fill-white" name="information" />
            Select format:{" "}
          </span>
          <div className="flex gap-5">
            {format === "Guide" ? (
              <>
                <ButtonFormatSelected
                  handleFormat={handleFormat}
                  format={"Guide"}
                />
                <ButtonFormatNotSelected
                  handleFormat={handleFormat}
                  format={"RoadMap"}
                />
              </>
            ) : (
              <>
                <ButtonFormatNotSelected
                  handleFormat={handleFormat}
                  format={"Guide"}
                />
                <ButtonFormatSelected
                  handleFormat={handleFormat}
                  format={"RoadMap"}
                />
              </>
            )}
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="flex flex-col gap-2 mb-3 h-full">
          <span className="text-md font-semibold text-gray-300 items-center flex justify-start">
            <Icon name="lightbulb" className="mr-1 w-4 h-4 fill-white" />
            Quick suggestions:
          </span>
          <div className="flex flex-wrap gap-1.5 items-center text-balance md:items-center md:justify-center">
            {suggestions.map((value, id) => (
              <ButtonSgn
                content={value}
                handleSuggestions={handleSuggestions}
                key={id}
                loading={loading}
              />
            ))}
          </div>
        </div>
    </article>
  );
};

export { SearchBar };
