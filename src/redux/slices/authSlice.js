import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null
};

export const login = createAsyncThunk('user/login', async (credentials) => {
    try {
      const response = await axios.post(`http://localhost:8080/user/login`, {
        credentials
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


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = token
    },
    logOut(state, action) {
        state.user = null
        state.token = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
  }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
