import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  geocode: {
    latitude: null,
    longitude: null,
    radius: null
  },
  visitedPubs: [],
};


const pubsSlice = createSlice({
  name: "pubs",
  initialState,
  reducers: {
    setVisitedPubs(state, action) {
      state.visitedPubs = action.payload.visitedPubs
    },
    setLocation(state, action) {
      const { latitude, longitude, radius } = action.payload

      state.geocode.latitude = latitude
      state.geocode.longitude = longitude
      state.geocode.radius = radius
    }
  },
});

export const { setVisitedPubs, setLocation } = pubsSlice.actions;

export default pubsSlice.reducer;
