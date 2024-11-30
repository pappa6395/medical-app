import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

const SearchBar = () => {
  return (
    <div>
      <form>
          <div className="flex items-center">
            <input
              type="search"
              id="default-search"
              className="flex relative text-sm w-[250px] md:w-[360px] p-3 text-gray-900 
              border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 
              focus:border-blue-500 dark:bg-gray-50 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <MagnifyingGlassIcon className="absolute translate-x-1
            w-6 h-6 text-gray-500 dark:text-gray-400"/>
            <button
              type="submit"
              className="text-white absolute translate-x-[170px] md:translate-x-[280px]
              bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
      </form>
    </div>
  );
};

export default SearchBar;
