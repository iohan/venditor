import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cx } from "@/utils/cx";

export type DropdownOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: DropdownOption[] | undefined;
  onChange: (value: DropdownOption) => void;
  placeholder?: string;
};

const Dropdown = ({
  options,
  onChange,
  placeholder = "Select an option",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    setSelectedIndex(null);
    setFocusedIndex(null);
  }, [options]);

  const handleOptionSelect = (index: number) => {
    setSelectedIndex(index);
    if (options && options.length > 0) {
      onChange(options[index]);
    }
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Tab":
        setIsOpen(false);
        break;
      case "Enter":
        if (isOpen && focusedIndex !== null) {
          handleOptionSelect(focusedIndex);
        } else {
          toggleDropdown();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        if (options) {
          setFocusedIndex((prev) =>
            prev === null || prev === options.length - 1 ? 0 : prev + 1,
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        if (options) {
          setFocusedIndex((prev) =>
            prev === null || prev === 0 ? options.length - 1 : prev - 1,
          );
        }
        break;
      case "Escape":
        closeDropdown();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={selectRef}
      className="relative basis-full outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="flex items-center justify-between p-3 text-sm bg-white bg-gray-200 rounded-lg cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>
          {selectedIndex !== null && options && selectedIndex < options.length
            ? options[selectedIndex].label
            : placeholder}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div className="absolute left-0 w-full mt-2 overflow-auto rounded-lg shadow max-h-60">
          {options &&
            options.map((option, index) => (
              <div
                key={option.value}
                className={cx(
                  "p-3 cursor-pointer border-b border-gray-300/70 text-sm",
                  "last:border-none",
                  focusedIndex === index && "bg-red-300 border-red-300",
                  focusedIndex !== index && "bg-gray-200 text-gray-900",
                )}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => handleOptionSelect(index)}
                role="option"
                aria-selected={selectedIndex === index}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
