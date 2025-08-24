import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons/dist/ai.js";

import { MarkdownWithCopy } from "./MarkdownWithCopy";

const Chat = ({
  responses,
  assistantResponse,
  userInput,
  userInputs,
  loading,
  scrollRef,
}) => {
  // ⬇️ Create an array of refs, one per response
  const responseRefs = useRef([]);

  // ⬇️ Simple PDF Export Function----------------------------------------------------
  const handleExportPDF = async (idx) => {
    try {
      // Get the response text
      const responseText = responses[idx];
      if (!responseText) {
        alert("No content to export");
        return;
      }

      // Create PDF document
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 6;
      let currentY = 20;

      // Add title
      doc.setFontSize(16);
      doc.text("Assistant Response", margin, currentY);
      currentY += 15;

      // Add date
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, currentY);
      currentY += 15;

      // Process content line by line to preserve code blocks
      doc.setFontSize(12);
      const lines = responseText.split("\n");
      let inCodeBlock = false;

      for (let line of lines) {
        // Check if we need a new page
        if (currentY > pageHeight - margin - lineHeight) {
          doc.addPage();
          currentY = margin;
        }

        // Handle code block start/end
        if (line.startsWith("```")) {
          inCodeBlock = !inCodeBlock;
          if (inCodeBlock) {
            // Starting code block
            currentY += 5;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("Code:", margin, currentY);
            doc.setFont("courier", "normal");
            doc.setFontSize(10);
            currentY += lineHeight;
          } else {
            // Ending code block
            currentY += 5;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
          }
          continue;
        }

        // Handle content inside code blocks
        if (inCodeBlock) {
          doc.setFont("courier", "normal");
          doc.setFontSize(10);
          const codeLines = doc.splitTextToSize(line, maxWidth);
          for (let codeLine of codeLines) {
            if (currentY > pageHeight - margin - lineHeight) {
              doc.addPage();
              currentY = margin;
            }
            doc.text(codeLine, margin + 5, currentY);
            currentY += lineHeight;
          }
          continue;
        }

        // Handle regular text
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Clean markdown formatting but keep structure
        let cleanLine = line
          .replace(/#{1,6}\s/g, "") // Remove header markers
          .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
          .replace(/\*(.*?)\*/g, "$1") // Remove italic
          .replace(/`(.*?)`/g, "$1") // Remove inline code
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
          .replace(/^\s*[-*+]\s/gm, "• ") // Convert bullets
          .replace(/^\s*\d+\.\s/gm, "• "); // Convert numbered lists to bullets

        // Skip empty lines but add small spacing
        if (cleanLine.trim() === "") {
          currentY += lineHeight * 0.5;
          continue;
        }

        // Split long lines and add them
        const splitLines = doc.splitTextToSize(cleanLine, maxWidth);
        for (let splitLine of splitLines) {
          if (currentY > pageHeight - margin - lineHeight) {
            doc.addPage();
            currentY = margin;
          }
          doc.text(splitLine, margin, currentY);
          currentY += lineHeight;
        }

        // Add small spacing after each line
        currentY += 1;
      }

      // Save the PDF
      doc.save(`response-${idx + 1}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };
  //------------------------------------------------------------------------------------

  return (
    <article
      className={`rounded-xl row-span-2 overflow-y-auto px-6 py-4 space-y-6 mb-4`}
    >
      {/* Render greeting if no messages yet */}
      {responses.length === 0 && !assistantResponse && !userInput ? (
        <div className="flex flex-col justify-center items-center h-full select-none">
          <h1 className="animate-pulse text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-cyan-500 text-transparent bg-clip-text p-5 font-extrabold drop-shadow-xl">
            Greetings
          </h1>
          <p className="text-center text-sm text-gray-500">
            Ask me anything and I'll create a personalized learning experience
            just for you
          </p>
        </div>
      ) : (
        <>
          {userInputs.map((userInput, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center space-y-4 max-w-4xl md:px-6 mx-auto"
            >
              {/* User Message */}
              <div className="flex justify-end w-full">
                <p className="px-6 py-2 shadow-sm bg-primary text-primary-foreground ml-12 rounded-xl">
                  {userInput}
                </p>
              </div>

              {/* Assistant Response (only render if it exists) */}
              {responses[idx] && (
                <div className="flex justify-start w-full">
                  <div
                    ref={(el) => (responseRefs.current[idx] = el)}
                    className="space-y-6 bg-card text-card-foreground px-6 py-4 rounded-2xl shadow-sm overflow-x-hidden text-pretty mr-12 border border-border/50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Assistant Response</span>
                      <button
                        onClick={() => handleExportPDF(idx)}
                        className="text-xs bg-card-foreground text-white hover:bg-card-foreground/80 px-3 py-1 rounded-md transition-colors duration-200"
                      >
                        Download as PDF
                      </button>
                    </div>
                    <MarkdownWithCopy
                      content={responses[idx]}
                      scrollRef={scrollRef}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Render current animated message */}
          {userInput && (
            <div className="flex flex-col px-6 space-y-4">
              <div className="flex justify-end w-full">
                <p className="px-6 py-2 shadow-sm bg-primary text-primary-foreground ml-12 rounded-xl">
                  {userInput}
                </p>
              </div>
              {loading && !assistantResponse && (
                <div className="flex justify-start w-full px-6">
                  <div className="bg-card animate-pulse px-6 py-5 rounded-xl shadow-md w-fit max-w-2xl space-y-2">
                    <div className="h-4 w-48 bg-card-foreground rounded"></div>
                    <div className="h-4 w-48 bg-card-foreground rounded"></div>
                    <div className="h-4 w-48 bg-card-foreground rounded"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
};

export { Chat };
