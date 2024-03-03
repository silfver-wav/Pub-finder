import { React, useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { searchPub } from "../redux/slices/pubsSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const pub = dispatch(searchPub(search));
      if (pub) {
        console.log("Pub found:", pub);
      } else {
        console.log("Pub not found");
      }
    }
  };

  return (
    <div className="searchDiv">
      <input
        type="text"
        placeholder="Search..."
        className="searchBar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <FaSearch
        className="searchIcon"
        onClick={() => dispatch(searchPub(search))}
      />
    </div>
  );
}
