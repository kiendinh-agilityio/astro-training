import React, { useCallback, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  title: string;
  items: string[];
};

export type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

const Accordion: React.FC<AccordionProps> = ({ items, className = "" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  const computedContainerClass = useMemo(
    () => `flex flex-col w-full max-w-md ${className}`.trim(),
    [className]
  );

  return (
    <div className={computedContainerClass}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.title}
            className="border-b border-white/20 last:border-b-0"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => handleToggle(index)}
              className="w-full px-0 py-4 text-white flex justify-between items-center cursor-pointer font-bold text-base focus:outline-none"
            >
              <span className="text-white font-bold">{item.title}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="list-none px-0 pb-4 pt-2 m-0">
                  {item.items.map((listItem, li) => (
                    <li
                      key={li}
                      className="text-white py-2 text-sm relative pl-4 hover:text-white/80 transition-colors duration-200"
                    >
                      <span className="absolute left-0 top-2 text-white">
                        •
                      </span>
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
