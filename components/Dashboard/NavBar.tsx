"use client";

import React, { useState } from "react";
import { AlignJustify, Bell, Mail, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import medicalLogo from '../../public/medicalLogo.png';
import Image from "next/image";

export default function Navbar() {

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  async function handleLogout() {

    router.push("/");
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="items-center -m-2 block md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center 
              p-2 text-gray-400 bg-white rounded-lg 
              hover:text-gray-500 hover:bg-gray-100 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-indigo-600"
            >
              <AlignJustify className="w-6 h-6" />
            </button>
          </div>

          <div className="flex ml-6 xl:ml-0">
            <div className="flex items-center flex-shrink-0">
              <Image
                className="block w-auto h-24 lg:hidden"
                src={medicalLogo}
                alt="Logo"
                width={100}
                height={100}
              />
              <Image
                className="hidden w-auto h-24 lg:block"
                src={medicalLogo}
                alt="Logo"
                width={100}
                height={100}
              />
            </div>
          </div>

          <div className="flex-1 hidden max-w-xs ml-40 mr-auto lg:block">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>

              <input
                type="search"
                id="search"
                className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                placeholder="Type to search"
              />
            </div>
          </div>

          <div className="flex items-center justify-end ml-auto space-x-6">
            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
              >
                <Mail className="w-6 h-6" />
              </button>
              <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                2
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
              >
                <Bell className="w-6 h-6" />
              </button>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src="https://utfs.io/f/8b034fb4-1f45-425a-8c57-a7a68835311f-2558r.png"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1 px-4">
                    <div className="px-4 py-3">
                      <p className="text-sm">Johnson Jones</p>
                      <p className="text-sm font-medium truncate">johnson@gmail.com</p>
                    </div>
                    <div className="py-1">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Settings
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Earnings
                      </button>
                      <div className="border-t border-gray-200" />
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

