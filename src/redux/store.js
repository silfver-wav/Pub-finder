import { configureStore } from "@reduxjs/toolkit";
import pubsReducer from "./slices/pubsSlice";
import layerReducer from "./slices/layerSlice";
import pubReducer from "./slices/pubSlice";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlices/apiSlice";
import sheetReducer from "./slices/sheetSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    layer: layerReducer,
    pubs: pubsReducer,
    pub: pubReducer,
    search: searchReducer,
    auth: authReducer,
    sheet: sheetReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});
