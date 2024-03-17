import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mockData from "./mockData";
import axios from "axios";

const initialState = {
  pubs: [],
  status: "ideal", // Change to idel latter
  error: '',
};

export const searchPub = createAsyncThunk(
  "pubs/searchPub",
  async (pubName, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const { pubs } = getState();

    const existingPub = pubs.find((pub) => pub.name === pubName);

    if (existingPub) {
      return existingPub;
    }
    return null;
    /*

    try {
      const response = await client.get(`/fakeApi/pubs?name=${pubName}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    
    */
  }
);

export const fetchPubs = createAsyncThunk("pubs/fetchPubs", async ({ lat, lng, radius }) => {
  try {
    const response = await axios.get(`http://localhost:8080/pub/getPubs/${lat}/${lng}/${radius}`);
    console.log(response.data);
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
      });
  },
});

export default pubsSlice.reducer;
