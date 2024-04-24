import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pubs: [],
  visitedPubs: [],
  status: "ideal",
  error: '',
};

export const fetchPubs = createAsyncThunk("pubs/fetchPubs", async ({ lat, lng, radius }) => {
  try {
    const response = await axios.get(`http://localhost:8080/pub/getPubs/${lat}/${lng}/${radius}`, {
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

export const fetchVisitedPubs = createAsyncThunk("user/getVisitedPubs", async () => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    if (token == null) {
      throw Error("no access Token");
    }
    const response = await axios.get(`http://localhost:8080/user/getVisitedPubs`, {
      headers: {
        'Authorization': `Bearer ${token}`,
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

const pubsSlice = createSlice({
  name: "pubs",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPubs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPubs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pubs = action.payload;
      })
      .addCase(fetchPubs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchVisitedPubs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVisitedPubs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visitedPubs = action.payload;
      })
      .addCase(fetchVisitedPubs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pubsSlice.reducer;
