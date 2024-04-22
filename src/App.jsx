import { React } from "react";
import { useDispatch } from "react-redux";
import SignupForm from './auth/SignupForm';
import LoginForm from "./auth/LoginForm";
import './App.css'
import StartPage from "./StartPage";
import { Routes, Route } from "react-router-dom";


export default function App() {  
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