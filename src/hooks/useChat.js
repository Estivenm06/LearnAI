import { useState } from "react";

const useChat = () => {
  const [assistantResponse, setAssistantResponse] = useState('');
  const [error, setError] = useState(null);

  const mutate = async ({ content }) => {
    try {
      const response = await fetch("/api/chat/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText);
        return;
      }

      const data = await response.json();

      if (data.content) {
        setAssistantResponse(data.content);
        return true;
      } else {
        setError("No content received from assistant.");
        return false;
      }
    } catch (err) {
      setError("Unexpected error: " + err.message);
    }
  };

  const clearResponse = () => setAssistantResponse('');

  return { mutate, error, assistantResponse, clearResponse };
};

export { useChat };
