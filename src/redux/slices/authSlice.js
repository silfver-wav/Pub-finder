import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'

localStorage.getItem('accessToken')

const initialState = {
  status: "idle",
  error: null
};

export const login = createAsyncThunk('user/login', async (credentials) => {
    try {
      console.log(credentials)
      const response = await axios.post(`http://localhost:8080/user/login`, {
        'email': credentials.email,
        'password': credentials.password,
      },
      {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const signup = createAsyncThunk('user/register', async (credentials) => {
  try {
    console.log(credentials);
    const response = await axios.post(`http://localhost:8080/user/register`, {
      'firstname': credentials.firstname,
      'firstname': credentials.firstname,
      'username': credentials.username,
      'email': credentials.email,
      'password': credentials.password,
    },
    {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const signout = createAsyncThunk('user/signout', async () => {
  try {
    console.log("logout");
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(`http://localhost:8080/user/logout`,
    {
      headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { accessToken, refreshToken } = action.payload
        localStorage.setItem("accessToken", accessToken);
        Cookies.set('refresher-cookie', refreshToken, { expires: 1})
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { accessToken, refreshToken } = action.payload
        localStorage.setItem("accessToken", accessToken);
        Cookies.set('refresher-cookie', refreshToken, { expires: 1})
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })

      .addCase(signout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        localStorage.clear();
        Cookies.remove('refresher-cookie')
        state.error = null;
        state.status = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
  }
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
