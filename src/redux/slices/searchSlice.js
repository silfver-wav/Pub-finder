import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
    },
    setResuls: (state, action) => {
      console.log(action.payload)
      // state.results = action.payload
    }
  },
});

export const { clearSearchResults, setResuls } = searchSlice.actions;

export default searchSlice.reducer;