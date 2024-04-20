import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from 'react-router-dom';


export default function LoginForm(){
    const dispatch = useDispatch();
    const loginStatus  = useSelector(state => state.auth.status);
    let navigate = useNavigate()


    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
    });

    const [formError, setFormError] = useState({
        ErrorMsg: "",
    })

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const validateFormInput = (event) => {
      event.preventDefault();
      
      dispatch(login(formInput));
    }

    useEffect(() => {
      if (loginStatus === 'succeeded') {
          // Clear the form after successful login
          setFormInput({
              email: "",
              password: "",
          });
          navigate('/')
      } else {
        setFormError({
          ErrorMsg: "login failed",
        })
      }
    }, [loginStatus]);

    return (
      <AuthContainer title="Login to your account">
        <form className="flex flex-col" onSubmit={validateFormInput}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            required
            className="input-field"
            onChange={({ target }) => { handleUserInput(target.name, target.value) }}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            className="input-field"
            onChange={({ target }) => { handleUserInput(target.name, target.value) }}
          />
          <p className="text-[#ff0015] mb-2 text-center " >{formError.ErrorMsg}</p>


          <button
            type="submit"
            className="bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60  rounded-md p-2
              w-[332px] focus:bg-white focus:outline-none transition ease-in-out duration-150 placeholder-white mb-4 ml-1.5"
          >
            Sign In
          </button>

          <p className="text-white mt-4 text-center ">
            Don't have an account yet? 
              <Link to="/signup" className="text-white-500 hover:underline mt-4 px-1" tabIndex="-1" id="menu-item-0">Sign Up</Link>
          </p>
        </form>
      </AuthContainer>
    );
}