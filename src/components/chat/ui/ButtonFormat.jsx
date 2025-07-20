import React from "react";

const ButtonFormatSelected = ({ handleFormat, format }) => {
  return (
    <button
      onClick={() => handleFormat(format)}
      className={`px-10 py-2 cursor-default ring-2 ring-search text-search duration-300 transition-all shadow-lg bg-white ${format === 'Guide' ? 'rounded-l-lg' : 'rounded-r-lg'}`}
    >
      {format}
    </button>
  );
};

const ButtonFormatNotSelected = ({ handleFormat, format }) => {
  return (
    <button
      onClick={() => handleFormat(format)}
      className={`hover:scale-105 hover:ring-2 hover:font-semibold px-10 py-2 shadow-lg cursor-pointer bg-gray-100 ring-1 ring-gray-500 text-gray-500 font-normal duration-300 transition-all ${format === 'Guide' ? 'rounded-l-lg' : 'rounded-r-lg'}`}
    >
      {format}
    </button>
  );
};

export { ButtonFormatSelected, ButtonFormatNotSelected };
