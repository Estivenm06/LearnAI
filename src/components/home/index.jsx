import React, { useEffect, useState, useRef } from "react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons/dist/ai.js";

import { SearchBar } from "../common/index.jsx";
import { useChat } from "../../hooks/useChat.js";

const Home = () => {
  const { mutate, assistantResponse, clearResponse } = useChat();
  const [responses, setResponses] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userInputs, setUserInputs] = useState([]);

  const outputRef = useRef(null);
  const scrollRef = useRef(null);

useEffect(() => {
  if (!assistantResponse || assistantResponse.length === 0) return;

  const output = outputRef;
  
  let i = 0;

  const typeNextChar = () => {
    if (i < assistantResponse.length) {
      output.current.innerText += assistantResponse[i];
      i++;

      scrollRef.current?.scrollIntoView({ behavior: "smooth" });

      setTimeout(typeNextChar, 1);
    } else {
      setResponses((prev) => [...prev, assistantResponse]);
      setUserInputs((prev) => [...prev, userInput]);
      clearResponse();
      setUserInput('');
    }
  };

  typeNextChar();

  return () => {
    if (output.current) {
      output.current.innerText = "";
    }
  };
}, [assistantResponse, clearResponse, userInput]);

  return (
    <main className="mt-25 md:mt-0 flex-1 h-screen relative overflow-hidden flex flex-col">
      <article
        className={`flex-1 overflow-y-auto px-6 py-4 space-y-6 ${
          responses.length > 0 || assistantResponse
            ? "z-0"
            : "z-20 w-full h-full flex justify-center items-center"
        }`}
      >
        {/* Render greeting if no messages yet */}
        {responses.length === 0 && !assistantResponse ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="greetings text-5xl lg:text-7xl bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text p-5 font-bold">
              Greetings
            </h1>
          </div>
        ) : (
          <>
            {userInputs.map((userInput, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center space-y-4"
              >
                {/* User Message */}
                <div className="flex justify-end w-full">
                  <p className="text-base font-medium text-white bg-learnSidebar px-4 py-3 rounded-xl shadow-sm w-fit max-w-xl whitespace-pre-wrap">
                    {userInput}
                  </p>
                </div>

                {/* Assistant Response (only render if it exists) */}
                {responses[idx] && (
                  <div className="flex justify-start w-full">
                    <p className="text-base text-gray-800 bg-gray-100 px-4 py-3 rounded-xl shadow-md w-fit max-w-2xl whitespace-pre-wrap">
                      {responses[idx]}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Render current animated message */}
            {userInput && (
              <div className="flex flex-col justify-center mx-auto items-center space-y-4">
                <div className="flex justify-end space-x-4 w-full">
                  <p className="text-base font-medium text-white bg-learnSidebar px-4 py-3 rounded-xl shadow-sm w-fit max-w-xl whitespace-pre-wrap">
                    {userInput}
                  </p>
                </div>
                {assistantResponse && (
                  <div className="flex justify-start w-full px-6" >
                    <p
                      ref={outputRef}
                      className="text-base font-medium text-blue-800 bg-blue-50 px-4 py-3 rounded-xl shadow-sm w-fit max-w-2xl whitespace-pre-wrap"
                    />
                  </div>
                )}
              </div>
            )}
            <div ref={scrollRef} />
          </>
        )}
      </article>
      <SearchBar mutate={mutate} setUserInput={setUserInput} />
    </main>
  );
};

export { Home };
