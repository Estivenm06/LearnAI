import React from "react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons/dist/ai.js";

import { MarkdownWithCopy } from "./MarkdownWithCopy";

const Chat = ({
  responses,
  assistantResponse,
  userInput,
  userInputs,
  loading,
  scrollRef,
}) => {
  return (
    <article
      className={`rounded-xl row-span-2 overflow-y-auto px-6 py-4 space-y-6 ${
        (responses.length > 0 || assistantResponse ? "bg-learnSidebar" : '')
      }`}
    >
      {/* Render greeting if no messages yet */}
      {responses.length === 0 && !assistantResponse && !userInput ? (
        <div className="flex justify-center items-center h-full select-none">
          <h1 className="animate-pulse text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text p-5 font-extrabold drop-shadow-xl">
            Greetings
          </h1>
        </div>
      ) : (
        <>
          {userInputs.map((userInput, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center space-y-4 max-w-4xl md:px-6 mx-auto"
            >
              {/* User Message */}
              <div className="flex justify-end w-full">
                <p className="text-base font-medium text-white bg-stone-500 px-4 py-3 rounded-xl shadow-md w-fit">
                  {userInput}
                </p>
              </div>

              {/* Assistant Response (only render if it exists) */}
              {responses[idx] && (
                <div className="flex justify-start">
                  <div
                    className="space-y-6 bg-learnbg text-white px-4 py-3 rounded-xl shadow-md overflow-x-hidden text-pretty "
                  >
                    <MarkdownWithCopy content={responses[idx]} scrollRef={scrollRef} />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Render current animated message */}
          {userInput && (
            <div className="flex flex-col px-6 space-y-4">
              <div className="flex justify-end w-full">
                <p className="text-base font-medium text-white bg-stone-500 px-4 py-3 rounded-xl shadow-sm w-fit">
                  {userInput}
                </p>
              </div>
              {loading && !assistantResponse && (
                <div className="flex justify-start w-full px-6">
                  <div className="bg-gray-200 animate-pulse px-6 py-5 rounded-xl shadow-md w-fit max-w-2xl space-y-2">
                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
};

export { Chat };
