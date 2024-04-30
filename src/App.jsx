import { React } from "react";
import { useDispatch } from "react-redux";
import SignupForm from './auth/SignupForm';
import LoginForm from "./auth/LoginForm";
import './App.css'
import StartPage from "./StartPage";
import { Routes, Route } from "react-router-dom";
import VisitedPubs from "./visitedPubs/VisitedPubs";
import UserReviews from "./review/UserReviews";


export default function App() {  
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/visitedPubs" element={<VisitedPubs />} />
        <Route path="/userReviews" element={<UserReviews />} />
      </Routes>
    </div>
  );
}