const ButtonFormat = ({ handleFormat, format, formatSelected }) => {
  return (
    <button
      onClick={() => handleFormat(format)}
      className={`px-4 py-1 cursor-default shadow-lg rounded-lg duration-300 transition-all ${formatSelected ? "bg-primary text-white font-semibold" : "bg-white cursor-pointer shadow-2xl hover:bg-secondary hover:text-white"}`}
    >
      {format}
    </button>
  );
};

export { ButtonFormat };
