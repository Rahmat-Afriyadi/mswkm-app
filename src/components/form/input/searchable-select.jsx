import { useEffect, useState, useRef } from "react";

export default function SearchableSelect({ options, name, setValue, setOpen = (e) => e }) {
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    return setValue(name, selectedOption);
  }, [selectedOption]); // eslint-disable-line

  useEffect(() => {
    return inputRef?.current?.focus();
  }, [inputRef]); // eslint-disable-line

  return (
    <div className="flex flex-col items-center ">
      <p className="text-2xl font-semibold text-slate-100">Searchable Select Input</p>
      <div className="relative w-[400px]">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border mt-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {filteredOptions.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  setSearchTerm(option); // Update search term to the selected option
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
