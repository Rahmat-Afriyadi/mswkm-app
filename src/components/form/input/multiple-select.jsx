"use client";

import { useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function MultipleSelect({ optionsList, placeholder, label, id, setValue, name }) {
  console.log("ini list yaa ", optionsList);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef(null);

  const filteredTags = optionsList.filter(
    (item) =>
      item.name?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.some((item1) => Object.values(item1).includes(item.id))
  );

  console.log("ini selected yaa ", selected);

  const isDisable =
    !query?.trim() ||
    selected.filter((item) => item.name?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim())?.length;

  return (
    <div className="relative w-full text-sm">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {label}
        </label>
      )}
      {selected?.length ? (
        <div className="w-full relative text-xs flex flex-wrap gap-1 p-2 mb-2 rounded-lg border-2 border-slate-700">
          {selected.map((tag) => {
            return (
              <div
                key={tag}
                className="rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500
                  flex items-center gap-2"
              >
                {optionsList.find((e) => e.id == tag.id)?.name}
                <div
                  className="cursor-pointer"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const theSelected = selected.filter((i) => i.id !== tag.id);
                    setSelected(theSelected);
                    setValue(name, theSelected);
                  }}
                >
                  X
                </div>
              </div>
            );
          })}
          <div className="w-full text-right">
            <span
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                setSelected([]);
                setValue(name, []);
                inputRef.current?.focus();
              }}
            >
              Clear all
            </span>
          </div>
        </div>
      ) : null}
      <div className=" rounded-lg flex items-center justify-between w-full gap-2.5 relative">
        <MagnifyingGlassIcon className="h-6 absolute left-2" />
        <input
          id={id}
          ref={inputRef}
          type="text"
          value={query}
          style={{
            outline: "none",
          }}
          onChange={(e) => setQuery(e.target.value.trimStart())}
          placeholder={placeholder}
          // className="pt-3 pb-2 block w-full pl-10 px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          className="block pl-9 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onFocus={() => setMenuOpen(true)}
          onBlur={() => setMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisable) {
              const theSelected = [...selected, query];
              setSelected(theSelected);
              setValue(name, theSelected);
              setQuery("");
              setMenuOpen(true);
            }
          }}
        />
        <ChevronUpDownIcon
          className="h-6 w-6 absolute right-2 cursor-pointer"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        {/* <button
            className="text-sm disabled:text-gray-300 text-rose-500 disabled:cursor-not-allowed"
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              setSelected((prev) => [...prev, query]);
              setQuery("");
              inputRef.current?.focus();
              setMenuOpen(true);
            }}
          >
            + Add
          </button> */}
      </div>

      {/* Menu's */}
      {menuOpen ? (
        <div className="z-30 bg-white shadow-md rounded-md absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
          <ul className="w-full overflow-y-auto">
            {filteredTags?.length ? (
              filteredTags.map((tag, i) => (
                <li
                  key={tag.id + " filtered-tags"}
                  className="p-2 cursor-pointer rounded-md w-full hover:bg-yellow hover:text-black hover:bg-cyan-300"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setMenuOpen(true);
                    const theSelected = [...selected, tag];
                    setSelected(theSelected);
                    setValue(name, theSelected);
                    setQuery("");
                  }}
                >
                  {tag.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options available</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
