import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex"; // Example plugin: KaTeX support
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const MarkdownWithCopy = ({ content, scrollRef }) => {
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
      <div ref={scrollRef} />
    </>
  );
};

export { MarkdownWithCopy };
