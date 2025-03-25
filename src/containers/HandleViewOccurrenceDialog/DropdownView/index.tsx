import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface IDropdownViewProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function DropdownView({
  title,
  children,
  className,
}: IDropdownViewProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className="w-full h-[3rem] flex py-1 px-4 justify-between items-center cursor-pointer border-2 rounded-md border-main-color"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="text-background-color font-bold">{title}</h2>
        {isOpen ? (
          <IoIosArrowUp className="text-main-color" />
        ) : (
          <IoIosArrowDown className="text-main-color" />
        )}
      </div>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-max" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 border-2 bg-gray-100">{children}</div>
      </div>
    </div>
  );
}
