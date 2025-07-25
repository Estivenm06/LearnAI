import React, { useEffect, useState, useRef } from "react";

import { Chat } from "./ui/Chat";
import { SearchBar } from "./ui/SearchBar";
import { useChat } from "../../hooks/useChat";

const Home = () => {
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
    <main className="max-w-screen-lg px-4 py-2 mx-auto h-screen relative overflow-hidden grid grid-rows-2 font-mono">
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

export { Home };
