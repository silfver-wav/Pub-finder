import { React, useState } from "react";
import "./SearchResults.css";
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
    <div className="searchDiv">
      <input
        type="text"
        placeholder="Search..."
        className="searchBar"
        onChange={(e) => handleChange(e.target.value)}
      />
      <FaSearch className="searchIcon" />
    </div>
  );
}
