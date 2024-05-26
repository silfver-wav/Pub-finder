import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../redux/slices/apiSlices/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation();
  const [formError, setFormError] = useState()
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(formInput).unwrap()
      const user = formInput.username
      dispatch(setCredentials({ response, user }));

      setFormInput({
        username: "",
        password: "",
      });
      navigate('/')
    } catch (err) {
      setFormError("Login Failed")
    }
  }

  return (
    <AuthContainer title="Login to your account">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          id="username"
          name="username"
          type="username"
          placeholder="Username"
          autoComplete="username"
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
        <p className="text-[#ff0015] mb-2 text-center " >{formError}</p>


        <button
          type="submit"
          className="bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60  rounded-md p-2
              w-[70vw] md:w-[360px] focus:bg-white focus:outline-none transition ease-in-out duration-150 placeholder-white m-auto mb-4"
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