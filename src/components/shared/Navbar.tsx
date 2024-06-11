"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { IoMoonSharp } from "react-icons/io5";
import Logo from "../../../public/Logo.png";
import LogoDark from "@/../public/Logo-dark.png";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Blogs",
    href: "/all-blogs",
  },
  {
    name: "Contact",
    href: "#",
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.body.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (document.body.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);

  const { user, isSignedIn } = useUser();

  return (
    <div className="dark:bg-[#181A2A] relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Image
              src={isDarkMode ? LogoDark : Logo}
              className="logo"
              width={100}
              height={100}
              alt="Logo"
            />
          </span>
        </div>
        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="inline-flex items-center text-sm text-gray-800 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex grow justify-end items-center ">
          <div className="flex justify-between items-center h-10 w-[200px] rounded-lg bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#242535]">
            <input
              className="bg-transparent focus:border-none focus:outline-none"
              type="text"
              placeholder="Search"
            ></input>
            <Search className="text-gray-600 cursor-pointer" />
          </div>
          <div className="hidden md:block ml-3 md:flex items-center space-x-2 ">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div
                className="file:group peer ring-0  bg-gradient-to-bl from-gray-500 to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute   peer-checked:after:rotate-180 after:bg-white after:outline-none after:h-4 after:w-4 after:top-1 after:left-1   peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-900"
                onClick={toggleTheme}
              ></div>
            </label>
            <IoMoonSharp />
            <div className="ms-5">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <Link href={"/sign-up"}>
                  <Button variant="default">Sign up</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="ml-2 mt-2 hidden lg:block"></div>
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white dark:bg-[#181A2A] shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Image
                      src={isDarkMode ? LogoDark : Logo}
                      className="logo"
                      width={100}
                      height={100}
                      alt="Logo"
                    />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm hover:bg-gray-50 dark:text-white"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="ml-3 mt-4 flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div
                      className="file:group peer ring-0  bg-gradient-to-bl from-gray-500 to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute   peer-checked:after:rotate-180 after:bg-white after:outline-none after:h-4 after:w-4 after:top-1 after:left-1   peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-900"
                      onClick={toggleTheme}
                    ></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}