import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/authSlice";
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const dispatch = useDispatch();
  const loginStatus  = useSelector(state => state.auth.status);
  let navigate = useNavigate()

  const [formInput, setFormInput] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    sucessMsg: "",
  });

  const [formError, setFormError] = useState({
    ErrorMsg: "",
  })

  const handleUserInput = (name, value) => {
    if (name === "username") {
      // check in backend if username exists
      console.log("check up");
    } else if (name == "email" && validateEmail(value)) {
      // check in backend if email exists
      console.log("check up");
    }

    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateFormInput = (event) => {
    event.preventDefault();
    console.log("here")

    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (formInput.password != formInput.confirmPassword) {
      setFormError({
        ...inputError,
        ErrorMsg: "Password and confirm password should be the same.",
      });
      return;
    }

    dispatch(signup(formInput))
  }

  useEffect(() => {
    if (loginStatus === 'succeeded') {
        setFormInput({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          sucessMsg: "",
        });
        navigate('/')
    } else if (loginStatus === 'failed') {
      setFormError({
        ErrorMsg: "signup failed",
      })
    }
  }, [loginStatus]);


  return (
    <AuthContainer title="Sign Up">
        <form className="flex flex-col" onSubmit={validateFormInput}>
          <div className="flex space-x-4 mb-4">
            <input
              id="fistname"
              name="fistname"
              type="text"
              placeholder="Fistname"
              autoComplete="fistname"
              required
              className="input-field-name"
              onChange={({ target }) => { handleUserInput(target.name, target.value) }}
            />
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Lastname"
              autoComplete="lastname"
              required
              className="input-field-name"
              onChange={({ target }) => { handleUserInput(target.name, target.value) }}
            />
          </div>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
            className="input-field"
            onChange={({ target }) => { handleUserInput(target.name, target.value) }}
          />

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

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
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
            Submit
          </button>

          <p className="text-white mt-4 text-center ">
            Already have an account? 
              <Link to="/login" className="text-white-500 hover:underline mt-4 px-1" tabIndex="-1" id="menu-item-0">Sign Up</Link>
          </p>

        </form>
    </AuthContainer>
  );
}