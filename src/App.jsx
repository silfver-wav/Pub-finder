import { React, useEffect } from "react";
import "./styles.css";
import Map from "./map/map";
import SideBar from "./sideBar/sideBar";
import { MdOutlineLayers } from "react-icons/md";
import SearchBar from "./searchBar/searchBar";
import { useDispatch } from "react-redux";
import { toggleLayer } from "./redux/slices/layerSlice";
import Weather from "./weather/weather";

export default function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <SearchBar />
      <SideBar />
      <Weather />
      <Map />
      <MdOutlineLayers
        onClick={() => dispatch(toggleLayer())}
        className="layer"
      />
    </div>
  );
}
