import React from "react";

const ButtonFormatSelected = ({ handleFormat, format }) => {
  return (
    <button
      onClick={() => handleFormat(format)}
      className="cursor-default shadow-md py-5 px-10 md:py-8 md:px-15 justify-center items-center flex bg-white rounded-md ring-2 ring-search font-bold text-search duration-300 transition-all"
    >
      {format}
    </button>
  );
};

const ButtonFormatNotSelected = ({ handleFormat, format }) => {
  return (
    <button
      onClick={() => handleFormat(format)}
      className="shadow-md cursor-pointer py-5 px-10 md:py-8 md:px-15 justify-center items-center flex bg-gray-50 rounded-md ring-2 ring-gray-500 text-gray-500 font-bold duration-300 transition-all"
    >
      {format}
    </button>
  );
};

export { ButtonFormatSelected, ButtonFormatNotSelected };
