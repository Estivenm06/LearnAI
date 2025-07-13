import React, { useEffect, useState, useRef } from "react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import { Icon } from "@ui5/webcomponents-react";

import { SearchBar } from "../common/index.jsx";
import { useChat } from "../../hooks/useChat.js";

const Home = () => {
  const { mutate, error, assistantResponse, clearResponse } = useChat();
  const [responses, setResponses] = useState([]);
  const [userInput, setUserInput] = useState('');
  const outputRef = useRef(null);

  useEffect(() => {
    if (!assistantResponse || assistantResponse.length === 0) return;

    const output = outputRef.current;
    output.innerText = "";
    let i = 0;

    const interval = setInterval(() => {
      if (i < assistantResponse.length) {
        output.innerText += assistantResponse[i];
        i++;
      } else {
        clearInterval(interval);
        setResponses((prev) => [...prev, assistantResponse]);
        clearResponse();
      }
    }, 10);

    return () => clearInterval(interval);
  }, [assistantResponse, clearResponse]);

  return (
    <main className="flex-1 min-h-screen grid grid-rows-2">
      <article className="row-span-2 flex mx-auto items-center">
        {/* Render greeting if no messages yet */}
        {responses.length === 0 && !assistantResponse ? (
          <h1 className="greetings text-5xl lg:text-7xl bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text p-5 font-bold">
            Greetings
          </h1>
        ) : (
          <div className="bg-learnSidebar max-w-3xl w-full max-h-[80vh] flex flex-col space-y-6 p-6 rounded-2xl shadow-lg border border-learnSidebar-200 my-10 overflow-y-scroll">
            {/* Render previous responses */}
            {responses.map((res, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                {/* Agent tag Icon */}
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full shadow-sm">
                  <Icon name="ai" className="w-5 h-5 items-center text-white" />
                  <span className="max-w-fit rounded-lg px-5 py-1 bg-gray-500 text-white font-bold">
                    {" "}
                    Agent
                  </span>
                </div>
                <p className="text-base text-gray-800 bg-gray-100 px-4 py-3 rounded-xl shadow-md w-fit max-w-2xl whitespace-pre-wrap">
                  {res}
                </p>
              </div>
            ))}

            {/* Render current animated message */}
            {assistantResponse && (
              <div className="flex items-start space-x-4">
                {/* Agent tag Icon */}
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full shadow-sm">
                  <Icon name="ai" className="w-5 h-5 items-center text-white" />
                  <span className="max-w-fit rounded-lg px-5 py-1 bg-gray-500 text-white font-bold">
                    {" "}
                    Agent
                  </span>
                </div>
                <p
                  ref={outputRef}
                  className="text-base font-medium text-blue-800 bg-blue-50 px-4 py-3 rounded-xl shadow-sm w-fit max-w-2xl whitespace-pre-wrap"
                />
              </div>
            )}
          </div>
        )}
      </article>
      <SearchBar mutate={mutate} />
    </main>
  );
};

export { Home };
