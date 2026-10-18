import { createSlice } from "@reduxjs/toolkit";

type Product = {
  name: string;
  quantity: number;
  price: number;
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: [] as Product[],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addProduct } = inventorySlice.actions;

export default inventorySlice.reducer;
