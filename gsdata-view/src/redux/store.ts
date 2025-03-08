import { configureStore, createSlice } from "@reduxjs/toolkit";

// Dummy reducer to prevent Redux errors
const dummySlice = createSlice({
  name: "dummy",
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: {
    dummy: dummySlice.reducer,  // Adding at least one reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
