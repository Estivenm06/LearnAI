import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex"; // Example plugin: KaTeX support
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const getTextFromChildren = (children) => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join("");
  }
  if (
    typeof children === "object" &&
    children !== null &&
    "props" in children
  ) {
    return getTextFromChildren(children.props.children);
  }
  return "";
};

const CodeBlock = ({ inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const codeText = getTextFromChildren(children);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="bg-learnbg px-1 py-0.5 rounded" {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-xs bg-learnSidebar px-2 py-1 rounded cursor-pointer"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="bg-learnbg p-4 rounded-md overflow-x-auto">
        <code className="bg-transparent" {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

const MarkdownWithCopy = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        code: CodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export { MarkdownWithCopy };
