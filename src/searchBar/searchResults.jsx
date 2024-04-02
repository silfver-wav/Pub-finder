import { React } from "react";
import "./SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import { getPub } from "../redux/slices/pubSlice";
import { clearSearchResults } from "../redux/slices/searchSlice";

export default function SearchResults() {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);
  console.log(searchResults);

  const handleClick = (id) => {
    // Dispatch action to get the pub
    dispatch(getPub(id));
    dispatch(clearSearchResults());
  };

  return (
    <div className="results-list">
      {searchResults.map((rs) => (
        <div
          className="result"
          onClick={() => handleClick(rs.id)}
          key={rs.id}
        >
          {rs.name}
        </div>
      ))}
    </div>
  );
}
