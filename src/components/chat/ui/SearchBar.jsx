import React, { useState } from "react";
import { Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons";
import "@ui5/webcomponents-icons/dist/feeder-arrow";
import "@ui5/webcomponents-icons/dist/media-pause";
import "@ui5/webcomponents-icons/dist/information";
import "@ui5/webcomponents-icons/dist/lightbulb";

import { ButtonSgn } from "./ButtonSuggestion";
import { ButtonFormatNotSelected, ButtonFormatSelected } from "./ButtonFormat";

const formatRequest = (format, input) => {
  return format === "Guide"
    ? "Make a comprehensive guide in depth with relevant information of this topic: " +
        input
    : "Make a comprehensive RoadMap in depth with relevant information (From courses, Youtube Channels, Books and more you want to add.) of this topic: " +
        input;
};

const SearchBar = ({ mutate, setUserInput, loading }) => {
  const [format, setFormat] = useState("Guide");

  const onSubmit = (event) => {
    event.preventDefault();
    const inputUser = event.target.querySelector("input");
    if (inputUser.value.trim() === "") {
      inputUser.classList.remove("border-search");
      inputUser.classList.add("border-red-500");
      inputUser.placeholder = "Insert something...";
      return;
    } else {
      inputUser.classList.remove("border-red-500");
      inputUser.classList.add("border-search");
      inputUser.placeholder = "Something you want to learn?";
    }
    const valueInputUser = inputUser.value;
    const content = formatRequest(format, valueInputUser);
    setUserInput(valueInputUser);
    if (mutate({ content })) {
      inputUser.value = "";
    }
  };

  const handleSuggestions = (inputUser) => {
    setUserInput(inputUser);
    const content = formatRequest(format, inputUser);
    mutate({ content });
  };

  const handleFormat = (format) => setFormat(format);

  return (
    <article className="px-6 pb-2 py-1">
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
        <div className="w-full">
          <div className="flex font-bold">
            {["Guide", "RoadMap"].map((f) =>
              format === f ? (
                <ButtonFormatSelected
                  key={f}
                  handleFormat={handleFormat}
                  format={f}
                />
              ) : (
                <ButtonFormatNotSelected
                  key={f}
                  handleFormat={handleFormat}
                  format={f}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="hidden sm:flex flex-col gap-2 mb-3">
        <span className="text-md font-semibold text-gray-300 items-center flex justify-start">
          <Icon name="lightbulb" className="mr-1 w-4 h-4 fill-white" />
          Quick suggestions:
        </span>
        <div className="flex flex-wrap gap-1.5 items-center">
          {[
            "Learn Python programming",
            "Web development basics",
            "Digital marketing",
            "Machine learning",
          ].map((value, id) => (
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
