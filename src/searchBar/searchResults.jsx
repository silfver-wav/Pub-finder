import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPub } from "../redux/slices/pubSlice";
import { clearSearchResults } from "../redux/slices/searchSlice";
import correctEncoding from "../utils/correctEncoding";
import './SearchResults.css'

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
    <div className="bg-gray-900 w-1/2 rounded-lg px-4 py-0 flex shadow-md items-center absolute top-10 left-1/2 flex-col mt-12 max-h-80 overflow-y-auto transform -translate-x-1/2 z-50 text-gray-300 scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded-full">
      {searchResults.map((rs) => (
        <div
          className="rounded-md h-10 cursor-pointer items-center flex hover:bg-gray-800 px-2 py-2 w-full mt-1"
          onClick={() => handleClick(rs.id)}
          key={rs.id}
        >
          {correctEncoding(rs.name)}
        </div>
      ))}
    </div>
  );
}
