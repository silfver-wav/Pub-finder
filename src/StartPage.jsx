import { React } from "react";
import Map from "./map/map";
import SideBar from "./sideBar/sideBar";
import { MdOutlineLayers } from "react-icons/md";
import SearchBar from "./searchBar/searchBar";
import { useDispatch } from "react-redux";
import { toggleLayer } from "./redux/slices/layerSlice";
import SearchResults from './searchBar/searchResults';
import DropdownMenu from "./menu/DropdownMenu";

export default function StartPage() {
  const dispatch = useDispatch();

  return (
    <>
      <DropdownMenu />
      <SearchBar />
      <SideBar />
      <SearchResults />
      <MdOutlineLayers
        onClick={() => dispatch(toggleLayer())}
        className="h-10 w-10 fixed bottom-2 left-2 cursor-pointer z-30 text-white hover:h-12 hover:w-12 transition-all"
      />
      <Map className="z-10" />

    </>
  );
}