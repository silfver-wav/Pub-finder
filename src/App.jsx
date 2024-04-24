import { React } from "react";
import { useDispatch } from "react-redux";
import SignupForm from './auth/SignupForm';
import LoginForm from "./auth/LoginForm";
import './App.css'
import StartPage from "./StartPage";
import { Routes, Route } from "react-router-dom";
import VisitedPubs from "./visitedPubs/VisitedPubs";


export default function App() {  
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/visitedPubs" element={<VisitedPubs />} />
      </Routes>
    </div>
  );
}