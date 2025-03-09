import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice";
import skuReducer from "./slices/skuSlice";

const store = configureStore({
  reducer: {
    store: storeReducer,
    sku: skuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
  
export type AppDispatch = typeof store.dispatch;
export default store;
