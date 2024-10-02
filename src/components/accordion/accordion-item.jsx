"use client"

import React, { useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  const contentHeight = useRef();
  return (
    <div className="wrapper">
      <button className={`question-container ${isOpen ? "active" : ""}`} onClick={onClick}>
          <p className="question-content text-[4vw] sm:text-xl pr-1">{question}</p>
          <div className="w-6 h-6">
              <ChevronDownIcon className={`arrow w-6 h-6 ${isOpen ? "active" : ""}`} />
          </div>
      </button>

      <div
        ref={contentHeight}
        className="answer-container"
        style={isOpen ? { height: contentHeight.current.scrollHeight } : { height: "0px" }}
      >
        <p className="answer-content text-[4vw] sm:text-xl">{answer}</p>
      </div>
    </div>
  );
};

export { AccordionItem };
