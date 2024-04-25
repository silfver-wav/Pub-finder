import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geocode: [],
  pub: {},
};


const pubSlice = createSlice({
  name: "pub",
  initialState,
  reducers: {
    focusOnPub(state, action) {
      state.geocode = action.payload;
    },
    setPub(state, action) {
      state.pub = action.payload;
      state.geocode = [action.payload.lat, action.payload.lng];
    },
  },
});

export const { focusOnPub, setPub } = pubSlice.actions;

export default pubSlice.reducer;
