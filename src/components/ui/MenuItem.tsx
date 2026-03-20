"use client";

import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/button";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuItem = ({ item, isOpen, color = "text-white", onClick }: any) => {
  const [fadeOut, setFadeOut] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (isOpen && window.scrollY > 200) {
  //       onClick(); // đóng menu
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isOpen, onClick]);

  return (
    <div className="relative inline-block text-left">
      {(!item.children || !item.children.length) && item.href ? (
        <Link
          onClick={onClick}
          href={item.href}
          className={`${
            isOpen ? "text-blue-300" : color
          } text-[15px] font-semibold hover:text-blue-300 flex flex-row items-center`}
        >
          {item.icon ? item.icon : <span>{item.name}</span>}
        </Link>
      ) : (
        <div
          onClick={() => {
            setFadeOut(isOpen);
            onClick();
          }}
          className={`${
            isOpen ? "text-blue-300" : color
          } text-[15px] font-semibold hover:text-blue-300 flex flex-row items-center hover:cursor-pointer`}
        >
          {item.icon ? (
            item.icon
          ) : (
            <>
              <span>{item.name}</span>
              {item.children && item.children.length > 0 && (
                <ChevronDown className="ml-1" />
              )}
            </>
          )}
        </div>
      )}

      {isOpen && (
        <div
          className={`absolute ${
            item.icon ? "w-[300px] p-3 right-0" : "w-60 left-0"
          } mt-2 bg-white rounded-md shadow-lg z-10 transition-transform duration-300 ${fadeOut ? "fade-out" : "fade-in"}`}
        >
          {item.icon && (
            <div className="flex flex-row items-stretch space-x-2">
              <input
                type="search"
                className="form-input border border-gray-300"
                placeholder="Tìm kiếm..."
              />
              <Button className="bg-blue-800 rounded-r-xl -ml-12.5 px-3">
                <Search />
              </Button>
            </div>
          )}
          {item.children &&
            item.children.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            item.children.map((option: any, index: number) => (
              <Link
                key={index}
                onClick={onClick}
                href={option.href}
                className={`flex flex-col p-3 text-blue-800 rounded-md hover:bg-blue-300 ${
                  index === 0 ? "" : "border-t border-t-gray-300"
                }`}
              >
                {option.name}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
