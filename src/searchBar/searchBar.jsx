import { React, useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Input } from "@material-tailwind/react";
import { useSearchForPubQuery } from "../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import SearchResults from "./searchResults";

export default function SearchBar() {
  const dispatch = useDispatch();
  const stopWords = [
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no',
    'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this',
    'to', 'was', 'will', 'with'
  ];
  const [term, setTerm] = useState();
  const { data: result = [] } = useSearchForPubQuery(term ? term : skipToken);
  const [searchResults, setSearchResults] = useState([])

  const handleChange = (search) => {
    if (search.length > 1) {
      search = search.toLowerCase();
      const words = search.split(' ');

      const filteredWords = words.filter((word, index) => index === 0 || !stopWords.includes(word));
      search = filteredWords.join(' ');

      if (search.length < 9) {
        setTerm(search)
      }
    } else {
      clearSearch();
    }
  };

  useEffect(() => {
    setSearchResults(result)
  }, [term])

  function clearSearch() {
    setTerm('');
    setSearchResults([]);
  }

  return (
    <>
      <div className="bg-gray-900 w-1/2 h-10 rounded-lg px-6 shadow-md flex items-center absolute top-4 left-1/2 transform -translate-x-1/2 z-40 ">
        <Input
          type="text"
          label="Search..."
          className="w-full h-full bg-transparent border-none border-transparent focus:border-transparent text-lg ml-1 text-white"
          icon={<FaSearch className="text-black" />}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <SearchResults searchResults={searchResults} clearSearch={clearSearch} />
    </>
  );
}
