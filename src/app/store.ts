import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../features/inventory/inventorySlice";

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});


// RootState describes the complete state structure of our store
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch describes the type of Redux's dispatch function.
export type AppDispatch = typeof store.dispatch;