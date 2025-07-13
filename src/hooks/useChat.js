import { useState } from "react";

const useChat = () => {
  const [assistantResponse, setAssistantResponse] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mutate = async ({ content }) => {
    try {
      setLoading(true);
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
        setLoading(false);
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

  return { mutate, error, assistantResponse, clearResponse, loading };
};

export { useChat };
