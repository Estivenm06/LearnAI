import React, { useEffect, useState, useRef } from "react";

import { Chat } from "./components/chat";
import { SearchBar } from "./components/chat/common/SearchBar";
import { useChat } from "./hooks/useChat";

const App = () => {
  const { mutate, assistantResponse, clearResponse, loading } = useChat();
  const [responses, setResponses] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userInputs, setUserInputs] = useState([]);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!assistantResponse || assistantResponse.length === 0) return;

    if (assistantResponse && assistantResponse.length > 0) {
      setResponses((prev) => [...prev, assistantResponse]);
      setUserInputs((prev) => [...prev, userInput]);
      clearResponse();
      setUserInput("");
    }
  }, [assistantResponse, clearResponse, userInput]);
  return (
    <main className="max-w-4xl mx-auto h-screen relative overflow-hidden grid grid-rows-2">
      <Chat
        responses={responses}
        assistantResponse={assistantResponse}
        loading={loading}
        scrollRef={scrollRef}
        userInput={userInput}
        userInputs={userInputs}
      />
      <SearchBar
        mutate={mutate}
        setUserInput={setUserInput}
        loading={loading}
      />
    </main>
  );
};

export { App };
