import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  realisticMap: false,
};

const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    toggleLayer(state, action) {
      state.realisticMap = !state.realisticMap;
    },
  },
});

export const { toggleLayer } = layerSlice.actions;

export default layerSlice.reducer;
