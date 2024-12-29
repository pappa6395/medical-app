"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

const SearchBar = () => {

  const [query, setQuery] = React.useState("");
  const router = useRouter()

  function handleSearch (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?query=${query}`)
    setQuery("")
    
  }

  return (
    <div>
      <form className={"max-w-md"} onSubmit={handleSearch}>
          <div className="relative">
            <div className="flex items-center">
              <input
                type="search"
                id="default-search"
                onChange={e => setQuery(e.target.value)}
                value={query}
                className="block text-sm w-[190px] sm:w-[330px] md:w-[330px] h-10 p-4 ps-8 text-gray-900 
                border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 
                focus:border-blue-500 dark:bg-gray-50 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 
                dark:focus:border-blue-500 placeholder:px-3"
                placeholder="Search doctors, services..."
                required
              />
              <MagnifyingGlassIcon className="absolute inset-x-2
              w-6 h-6 text-gray-500 dark:text-gray-400"/>
              <button
                type="submit"
                className="text-white absolute hidden md:block translate-x-[110px]
                sm:translate-x-[253px] md:translate-x-[253px]
                bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 
                dark:bg-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default SearchBar;
