import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  geocode: [],
  pub: {},
  status: "idle",
  error: null
};

export const getPub = createAsyncThunk("pubs/getPub", async (id) => {
    try {
      console.log(id);
      const response = await axios.get(`http://localhost:8080/pub/getPub/${id}`, {
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


const pubSlice = createSlice({
  name: "pub",
  initialState,
  reducers: {
    focusOnPub(state, action) {
      state.geocode = action.payload;
    },
  },
  extraReducers(builder) {
      builder
        .addCase(getPub.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getPub.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.pub = action.payload;
          state.geocode = [action.payload.lat, action.payload.lng];
        })
        .addCase(getPub.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
  },
});

export const { focusOnPub } = pubSlice.actions;

export default pubSlice.reducer;
