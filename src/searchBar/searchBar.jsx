import { React, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { searchPub } from "../redux/slices/searchSlice";
import { clearSearchResults } from "../redux/slices/searchSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const stopWords = [
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no',
      'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this',
      'to', 'was', 'will', 'with'
  ];

  const handleChange = (search) => {
    if (search.length > 1) {
        search = search.toLowerCase();
        const words = search.split(' ');

        const filteredWords = words.filter((word, index) => index === 0 || !stopWords.includes(word));
        search = filteredWords.join(' ');

        if (search.length < 9) {
            const pub = dispatch(searchPub(search));
        }
    } else {
        dispatch(clearSearchResults());
    }
  };

  return (
<div className="bg-gray-900 w-1/2 h-10 rounded-lg px-6 shadow-md flex items-center absolute top-4 left-1/2 transform -translate-x-1/2 z-40 ">
  <input
    type="text"
    placeholder="Search..."
    className="w-full h-full bg-transparent border-none border-transparent focus:border-transparent focus:ring-0 text-lg ml-1 text-gray-300"
    onChange={(e) => handleChange(e.target.value)}
  />
  <FaSearch className="text-black" />
</div>
  );
}
