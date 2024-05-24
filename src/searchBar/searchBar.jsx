import { React, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@material-tailwind/react";
import { useSearchForPubQuery } from "../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import correctEncoding from "../utils/correctEncoding";
import { setPub } from "../redux/slices/pubSlice";
import { useGetPubQuery } from "../redux/slices/apiSlices/pubApiSlice";
import stopWords from "../utils/stopWords";
import { useGetPubsQuery } from "../redux/slices/apiSlices/pubApiSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const geocode = useSelector((state) => state.pubs.geocode);
  const [inputValue, setInputValue] = useState('');
  const [term, setTerm] = useState();
  const { data: result = [] } = useSearchForPubQuery(term ? term : skipToken);
  const [searchResults, setSearchResults] = useState([])
  const [pubId, setPubId] = useState(null);

  const { data: pubs = [] } = useGetPubsQuery(geocode ? geocode : skipToken)
  const { data: pub, isSuccess } = useGetPubQuery(pubId ? pubId : skipToken)

  const handleChange = (search) => {
    setInputValue(search)
    if (search.length > 1) {
      search = search.toLowerCase();
      const words = search.split(' ');

      const filteredWords = words.filter((word, index) => index === 0 || !stopWords.includes(word));
      search = filteredWords.join(' ');

      if (search.length < 9) {
        setTerm(search)
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    setSearchResults(result)
  }, [term])

  const getPub = (id) => {
    if (!pubs.length) {
      setPubId(id);
      return;
    }

    const pub = pubs.find(obj => obj.id === id);

    if (!pub) {
      setPubId(id);
    } else {
      setAndClear(pub);
    }
  };

  useEffect(() => {
    if (isSuccess && pub) {
      setAndClear(pub);
    }
  }, [isSuccess, pub]);

  const setAndClear = (pub) => {
    dispatch(setPub(pub));
    setSearchResults([]);
    setInputValue('');
  }

  return (
    <>
      <div className="bg-gray-900 w-1/2 h-10 rounded-lg px-6 shadow-md flex items-center absolute top-4 left-1/2 transform -translate-x-1/2 z-40 ">
        <Input
          type="text"
          label="Search..."
          className="w-full h-full bg-transparent border-none border-transparent focus:border-transparent text-lg ml-1 text-off_white"
          icon={<FaSearch className="text-black" />}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>


      {searchResults != [] &&
        <div
          className="bg-gray-900 w-1/2 rounded-lg px-4 py-0 flex shadow-md items-center absolute top-4 left-1/2 flex-col mt-12 max-h-80 overflow-y-auto transform -translate-x-1/2 z-50 text-gray-300 scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded-full"
        >
          {searchResults.map((rs) => (
            <div
              className="rounded-md h-10 cursor-pointer items-center flex hover:bg-gray-800 px-2 py-2 w-full mt-1"
              onClick={() => getPub(rs.id)}
              key={rs.id}
            >
              {correctEncoding(rs.name)}
            </div>
          ))}
        </div>
      }

    </>
  );
}
