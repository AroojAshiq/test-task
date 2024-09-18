"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="px-10">
      <div>
        {/* Desktop Navbar */}
        <div className="relative lg:h-10 h-14 w-full pb-5 flex justify-between items-center">
          <div className="xl:w-full w-1/2 lg:w-[74%] right-0">
            <div className="hidden lg:flex justify-end items-center py-4">
              <ul className="flex space-x-6 lg:mt-3 justify-center items-center">
                <li className="group relative cursor-pointer">
                  <Link href="/">
                    <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-xs font-medium leading-8">
                      Home
                    </p>
                  </Link>
                  <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                </li>
                <li className="group relative cursor-pointer">
                  <Link href="/">
                    <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-xs font-medium leading-8">
                      Services
                    </p>
                  </Link>
                  <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                </li>
                <li className="group relative cursor-pointer">
                  <Link href="/">
                    <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-xs font-medium leading-8">
                      About
                    </p>
                  </Link>
                  <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                </li>
                <li className="group relative cursor-pointer">
                  <Link href="/">
                    <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-xs font-medium leading-8">
                      Portfolio
                    </p>
                  </Link>
                  <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                </li>
                <li className="group relative cursor-pointer">
                  <Link href="/">
                    <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-xs font-medium leading-8">
                      Contact
                    </p>
                  </Link>
                  <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                </li>
                <li className="group relative cursor-pointer">
                  <Link href="/">
                    <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-xs font-medium leading-8">
                      Support
                    </p>
                  </Link>
                  <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                </li>

                <li>
                  <button
                    onClick={() => signOut()}
                    className="text-base w-[120px] h-10 rounded-md text-white bg-green-400"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Navbar */}
            <div className="lg:hidden absolute right-0">
              <button onClick={toggleNavbar}>
                <Image height={20} width={20} src="/menu.svg" alt="menu" />
              </button>

              <div
                className={`fixed border top-0 right-0 pt-5 z-40 px-6 h-full bg-[#3c3c3b] shadow-lg w-full overflow-y-auto transition-transform duration-300 ease-in-out ${
                  isOpen ? "" : "transform translate-x-full"
                }`}
              >
                <div className="flex justify-end mt-2" onClick={toggleNavbar}>
                  <Image height={20} width={20} src="/cancel.svg" alt="menu" />
                </div>
                <ul className="flex flex-col mt-3 space-y-2 justify-center items-center">
                  <li className="group relative cursor-pointer">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-base font-medium leading-8">
                        Home
                      </p>
                    </Link>
                    <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-base font-medium leading-8">
                        Services
                      </p>
                    </Link>
                    <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-base font-medium leading-8">
                        About
                      </p>
                    </Link>
                    <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-base font-medium leading-8">
                        Portfolio
                      </p>
                    </Link>
                    <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-base font-medium leading-8">
                        Contact
                      </p>
                    </Link>
                    <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <p className="text-[#646464] group-hover:text-green-400 lg:text-sm text-base font-medium leading-8">
                        Support
                      </p>
                    </Link>
                    <hr className="border-1 border-green-400 cursor-pointe transition-all duration-500 w-0 group-hover:w-full" />
                  </li>

                  <li>
                    <button className="text-base w-[120px] h-10 rounded-md text-white bg-[#478AF4]">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
