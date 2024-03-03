import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geocode: [],
};

const pubSlice = createSlice({
  name: "pub",
  initialState,
  reducers: {
    focusOnPub(state, action) {
      state.geocode = action.payload;
    },
  },
});

export const { focusOnPub } = pubSlice.actions;

export default pubSlice.reducer;
