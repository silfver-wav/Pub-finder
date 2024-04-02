import { React, useEffect } from "react";
import "./styles.css";
import Map from "./map/map";
import SideBar from "./sideBar/sideBar";
import { MdOutlineLayers } from "react-icons/md";
import SearchBar from "./searchBar/searchBar";
import { useDispatch } from "react-redux";
import { toggleLayer } from "./redux/slices/layerSlice";
import Weather from "./weather/weather";
import {BrowserView, MobileView} from 'react-device-detect';
import BottomBar from './bottomBar/bottomBar';
import SearchResults from './searchBar/searchResults';

export default function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
        <SearchBar />
        <SearchResults />
        <BrowserView >
            <MdOutlineLayers
               size={30}
               onClick={() => dispatch(toggleLayer())}
               className="layerBrowser"
             />
            <SideBar />
        </BrowserView >

        <MobileView >
            <MdOutlineLayers
            size={30}
            onClick={() => dispatch(toggleLayer())}
            className="layerMobile"
            />
            <BottomBar />
        </MobileView>

        <Weather />
        <Map />
    </div>
  );
}
