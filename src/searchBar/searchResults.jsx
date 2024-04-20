import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPub } from "../redux/slices/pubSlice";
import { clearSearchResults } from "../redux/slices/searchSlice";
import correctEncoding from "../utils/correctEncoding";

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
    <div className="">
      {searchResults.map((rs) => (
        <div
          className=""
          onClick={() => handleClick(rs.id)}
          key={rs.id}
        >
          {correctEncoding(rs.name)}
        </div>
      ))}
    </div>
  );
}
