
const ButtonSgn = ({ handleSuggestions, content, loading }) => {
  return (
    <>
    {loading ? (<>
    <button
      className="answering px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3 hover:scale-105 cursor-pointer transition-all duration-300"
      disabled={true}
    >
      {content}
    </button>
    </>) : (<>
    <button
      onClick={() => handleSuggestions({ content })}
      className="answering px-4 py-2 text-sm bg-white text-search font-bold rounded-full border-search border-3 hover:scale-105 cursor-pointer transition-all duration-300"
      disabled={false}
    >
      {content}
    </button>
    </>)}
    </>
  );
};

export { ButtonSgn };
