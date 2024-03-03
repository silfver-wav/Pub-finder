import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mockData from "./mockData";

const initialState = {
  pubs: mockData,
  status: "succeeded", // Change to idel latter
  error: null,
};

export const fetchPubs = createAsyncThunk("pubs/fetchPubs", async () => {
  const response = await client.get("/fakeApi/pubs");
  return response.data;
});

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

const pubsSlice = createSlice({
  name: "pubs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPubs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPubs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pubs = state.pubs.concat(action.payload);
      })
      .addCase(fetchPubs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(searchPub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPub.fulfilled, (state, action) => {
        state.loading = false;
        state.pubs.push(action.payload);
      })
      .addCase(searchPub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pubsSlice.reducer;
