import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Kategori() {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message); // Handle error
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  console.log("ini koordinates ", coordinates);

  const parentReff = useRef(null);
  const [startX, setStartX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    "All",
    "Perawatan & Perlengkapan Kendaraan",
    "Gaya Hidup",
    "Pendidikan",
    "Kesehatan & Olahraga",
    "Hiburan & Rekreasi",
    "Test 1",
    "Test 2",
  ];

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("kategori", "All");
    replace(`${pathname}?${params}`);
    setSelectedOption("All");
  }, []); // eslint-disable-line

  const handleSelection = (option) => {
    setSelectedOption(option);
    const params = new URLSearchParams(searchParams);
    params.set("kategori", option);
    replace(`${pathname}?${params}`);
  };

  const handleOnMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - parentReff.current.offsetLeft);
    setScrollLeft(parentReff.current.offsetLeft);
  };
  const handleOnMouseLeave = () => {
    setIsMouseDown(false);
  };
  const handleOnMouseUp = () => {
    setIsMouseDown(false);
  };
  const handleOnMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - parentReff.current.offsetLeft;
    const walk = (x - startX) * 0.9;
    parentReff.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="horizontalScroll p-4 flex-shrink-0"
      ref={parentReff}
      onMouseDown={handleOnMouseDown}
      onMouseLeave={handleOnMouseLeave}
      onMouseUp={handleOnMouseUp}
      onMouseMove={handleOnMouseMove}
    >
      {options.map((option, index) => (
        <label
          key={index}
          className={`flex items-center cursor-pointer py-2 px-4 mx-1  rounded-md ${
            selectedOption === option ? "text-white bg-red-500" : "bg-white text-gray-800 border-2 border-black "
          }`}
        >
          <input
            type="radio"
            name="multipleChoices"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleSelection(option)}
            className="w-4 h-4 accent-blue-600 appearance-none hidden"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}
