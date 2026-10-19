import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getProducts } from "../../services/productService.ts";

type Product = {
  id: number;
  title: string;
  stock: number;
  price: number;
};

export const fetchProducts = createAsyncThunk(
  "inventory/fetchProducts",
  async () => {
    const data = await getProducts();

    return data.products;
  },
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch products";
    });
  },
});

export const { addProduct, removeProduct } = inventorySlice.actions;

export default inventorySlice.reducer;
