"use client"

import { useState } from "react";
import { AccordionItem } from "./accordion-item";
import data from "./data"

const Accordion = () => {
 const [activeIndex, setActiveIndex] = useState(null);

 const handleItemClick = (index) => {
  setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
 };

 return (
  <div className='w-10/12 bg-slate-200 rounded-xl p-5'>
    <p className="text-[4.7vw] sm:text-2xl font-bold">
        Frequently Asked Questions
    </p>
    {data.map((item, index) => (
    <AccordionItem
     key={index}
     question={item.question}
     answer={item.answer}
     isOpen={activeIndex === index}
     onClick={() => handleItemClick(index)}
    />
   ))}
  </div>
 )
};

export default Accordion;