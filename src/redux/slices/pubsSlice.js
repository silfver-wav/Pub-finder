import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  pubs: [],
  visitedPubs: [],
};


const pubsSlice = createSlice({
  name: "pubs",
  initialState,
  reducers: {
    setVisitedPubs(state, action) {
      state.visitedPubs = action.payload.visitedPubs
    },
    setPubs(state, action) {
      state.pubs = action.payload
    }
  },
});

export const { setVisitedPubs, setPubs } = pubsSlice.actions;

export default pubsSlice.reducer;
