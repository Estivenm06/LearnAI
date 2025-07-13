import React from "react";

const RenderStructuredResponse = ({ text }) => {
  const parts = text.split("\n\n");

  const heading = parts[0];
  const listItems = parts[1]
    ?.split("\n")
    ?.filter((line) => /^\d+\.\s/.test(line) || []);
  const closing = parts.slice(2).join("\n\n");

  return (
    <section className="space-y-4 bg-gray-100 px-4 py-3 rounded-xl shadow-md w-fit max-w-2xl whitespace-pre-wrap">
      <h2 className="text-xl font-bold text-learnSidebar">{heading}</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
        {listItems?.map((item, idx) => (
          <li
            key={idx}
            dangerouslySetInnerHTML={{
              __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        ))}
      </ul>
      <p className="text-gray-700">{closing}</p>
    </section>
  );
};

export { RenderStructuredResponse };
