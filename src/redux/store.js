import { configureStore } from "@reduxjs/toolkit";
import pubsReducer from "./slices/pubsSlice";
import layerReducer from "./slices/layerSlice";
import pubReducer from "./slices/pubSlice";

export const store = configureStore({
  reducer: {
    layer: layerReducer,
    pubs: pubsReducer,
    pub: pubReducer,
  },
});
