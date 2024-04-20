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
import SignupForm from './auth/SignupForm';
import LoginForm from "./auth/LoginForm";
import AuthContainer from "./auth/AuthContainer";
import DropdownMenu from "./DropdownMenu";
import './App.css'
import StartPage from "./StartPage";
import { Routes, Route } from "react-router-dom";


export default function App() {

  const dispatch = useDispatch();
  
  return (
    <div>
      <StartPage />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}
/*
<div className="App">
  hello world
</div>
*/