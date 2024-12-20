import React, { useEffect, useState } from "react";

export default function MultipleCheckbox({ options, setState, defaultValues = [] }) {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(defaultValues);

  useEffect(() => {
    return setState(selectedCheckboxes);
  }, [selectedCheckboxes]); //eslint-disable-line

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedCheckboxes.includes(value)) {
      // Remove it if already selected
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== value));
    } else {
      // Add it if not selected
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };
  return (
    <>
      {options.map((e) => {
        return (
          <div key={e.value} className="w-ma flex items-center mt-1 gap-x-2">
            <input
              type="checkbox"
              value={e.value}
              id={e.value}
              className="cursor-pointer"
              checked={selectedCheckboxes.includes(e.value)}
              onChange={handleCheckboxChange}
            />
            <label className="cursor-pointer" htmlFor={e.value}>
              {e.value}
            </label>
          </div>
        );
      })}
    </>
  );
}
