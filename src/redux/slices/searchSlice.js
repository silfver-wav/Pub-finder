import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  results: [],
  status: "idle",
  error: '',
};

export const searchPub = createAsyncThunk("pubs/searchPub", async (pubName) => {
    try {
      console.log(pubName);
      const response = await axios.get(`http://localhost:8080/pub/searchPubs/${pubName}`, {
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

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
      clearSearchResults: (state) => {
        state.results = [];
      }
  },
  extraReducers(builder) {
    builder
      .addCase(searchPub.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchPub.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(searchPub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;