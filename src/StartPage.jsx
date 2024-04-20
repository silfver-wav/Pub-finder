import { React, useEffect } from "react";
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
import DropdownMenu from "./DropdownMenu";
import LoginForm from "./auth/LoginForm";

export default function StartPage() {
  const dispatch = useDispatch();

  return (
    <>
      <DropdownMenu />
      <SearchBar />
      <SearchResults />
      <MdOutlineLayers
        size={30}
        onClick={() => dispatch(toggleLayer())}
        className="fixed bottom-2 left-2 cursor-pointer z-50 text-white"
        />
      <Map className="z-10" />

    </>
  );
}

/*
        <DropdownMenu />
        <SearchBar />
        <SearchResults />
        <BrowserView >
            <MdOutlineLayers
            size={30}
            onClick={() => dispatch(toggleLayer())}
            className="fixed bottom-2 left-2 cursor-pointer z-50 text-white"
            />
            <SideBar />
        </BrowserView >

        <MobileView >
            <MdOutlineLayers
            size={30}
            onClick={() => dispatch(toggleLayer())}
            className="fixed top-4 right-2 cursor-pointer z-50 text-white"
            />
            <BottomBar />
        </MobileView>
        */