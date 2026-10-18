import { createSlice, type PayloadAction  } from "@reduxjs/toolkit";

type Product = {
  name: string;
  quantity: number;
  price: number;
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: [] as Product[],
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      return state.filter(
        (product) => product.name !== action.payload
      );
    },
  },
});

export const { addProduct, removeProduct } = inventorySlice.actions;

export default inventorySlice.reducer;
