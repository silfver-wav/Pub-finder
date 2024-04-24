import { configureStore } from "@reduxjs/toolkit";
import pubsReducer from "./slices/pubsSlice";
import layerReducer from "./slices/layerSlice";
import pubReducer from "./slices/pubSlice";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    layer: layerReducer,
    pubs: pubsReducer,
    pub: pubReducer,
    search: searchReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});
