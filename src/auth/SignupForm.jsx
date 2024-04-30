import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from "../redux/slices/apiSlices/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

export default function SignupForm() {
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  let navigate = useNavigate()
  const [formError, setFormError] = useState()
  const [formInput, setFormInput] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    sucessMsg: "",
  });

  const handleUserInput = (name, value) => {
    if (name === "username") {
      // check in backend if username exists
      console.log("check up");
    }

    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formInput.password != formInput.confirmPassword) {
      setFormError("Password and confirm password should be the same.");
      return;
    }

    try {
      const response = await signup(formInput).unwrap()
      console.log(response)
      const user = formInput.username
      console.log("user: ", user)
      dispatch(setCredentials({ response, user }));

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
    } catch (err) {
      setFormError("Signup Failed")
    }
  }

  return (
    <AuthContainer title="Sign Up">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex space-x-4 m-auto">
            <input
              id="fistname"
              name="firstname"
              type="text"
              placeholder="Fistname"
              autoComplete="firstname"
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
          <p className="text-[#ff0015] mb-2 text-center " >{formError}</p>

          <button
            type="submit"
            className="bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60  rounded-md p-2
              w-[332px] focus:bg-white focus:outline-none transition ease-in-out duration-150 placeholder-white m-auto mb-4"
          >
            Submit
          </button>

          <p className="text-white mt-4 text-center ">
            Already have an account? 
              <Link to="/login" className="text-white-500 hover:underline mt-4 px-1" tabIndex="-1" id="menu-item-0">Sign In</Link>
          </p>

        </form>
    </AuthContainer>
  );
}