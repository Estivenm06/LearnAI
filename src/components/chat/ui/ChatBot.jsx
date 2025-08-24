import { useEffect, useState, useRef } from "react";
import { Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons";
import "@ui5/webcomponents-icons/dist/information";
import "@ui5/webcomponents-icons/dist/ai";
import "@ui5/webcomponents-icons/dist/source-code";
import "@ui5/webcomponents-icons/dist/trend-up";
import "@ui5/webcomponents-icons/dist/education";
import "@ui5/webcomponents-icons/dist/e-learning";
import "@ui5/webcomponents-icons/dist/paper-plane";

import { ButtonSgn } from "./ButtonSuggestion";
import { ButtonFormat } from "./ButtonFormat";
import { useChat } from "../../../hooks/useChat";
import { Chat } from "./Chat";

const formatRequest = (format, input) => {
  switch (format) {
    case "Guide":
      return (
        "Make a comprehensive guide in depth with relevant information of this topic: " +
        input
      );
    case "RoadMap":
      return (
        "Make a comprehensive RoadMap in depth with relevant information (From courses, Youtube Channels, Books and more you want to add.) of this topic: " +
        input
      );
    case "Chat":
      return "You are a helpful assistant. User's query: " + input;
    default:
      return input;
  }
};

const ChatBot = () => {
  const [format, setFormat] = useState("Chat");
  const [input, setInput] = useState("");
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

  const handleChange = (event) => setInput(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (input.trim() === "") return;
    const content = formatRequest(format, input);
    setUserInput(input);
    if (mutate({ content })) {
      setInput("");
    }
  };

  const handleSuggestions = (inputUser) => setInput(inputUser);

  const handleFormat = (format) => setFormat(format);

  return (
    <article className="mx-auto px-4 py-3 w-full max-w-4xl">
      {/* Quick Suggestions */}
      {userInputs.length <= 0 && !loading && (
        <div className="sm:flex flex-col gap-2 mb-6 mt-10">
          <span className="text-md font-semibold items-center flex justify-start">
            <Icon name="ai" className="mr-1 w-4 h-4 fill-primary" />
            Quick suggestions:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { suggestion: "Learn Python programming", icon: "source-code" },
              { suggestion: "Web development basics", icon: "education" },
              { suggestion: "Digital marketing", icon: "trend-up" },
              { suggestion: "Machine learning", icon: "e-learning" },
            ].map((content) => (
              <ButtonSgn
                content={content}
                handleSuggestions={handleSuggestions}
                key={content.suggestion}
              />
            ))}
          </div>
        </div>
      )}
      <Chat
        responses={responses}
        assistantResponse={assistantResponse}
        loading={loading}
        scrollRef={scrollRef}
        userInput={userInput}
        userInputs={userInputs}
      />
      {/* Main Search Form */}
      <form
        className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border pt-4 mb-6"
        onSubmit={onSubmit}
      >
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Something you want to learn?"
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pr-12 h-12 bg-input border-border/50 focus:border-primary/50 transition-colors"
              onChange={handleChange}
              value={input}
            />
          </div>
          {input === "" || loading ? (
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground shadow-xs py-2 has-[>svg]:px-3 h-12 px-6 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
              disabled={true}
            >
              <Icon name="paper-plane" className="fill-background" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground shadow-xs py-2 has-[>svg]:px-3 h-12 px-6 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
              disabled={false}
            >
              <Icon name="paper-plane" className="fill-white" />
            </button>
          )}
        </div>
        {/* Format AI Response*/}
        <div className="flex flex-col mt-6">
          <span className="text-md font-semibold items-center flex justify-start mb-2">
            Select format:{" "}
          </span>
          <div className="w-full">
            <div className="flex space-x-2">
              {["Chat", "Guide", "RoadMap"].map((f) => (
                <ButtonFormat
                  key={f}
                  handleFormat={handleFormat}
                  format={f}
                  formatSelected={format === f}
                />
              ))}
            </div>
          </div>
        </div>
      </form>
    </article>
  );
};

export { ChatBot };
