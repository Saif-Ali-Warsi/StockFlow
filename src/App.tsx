import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./app/store";
import {
  fetchProducts,
  addProduct,
  removeProduct,
} from "./features/inventory/inventorySlice";
import { useEffect, useState } from "react";

function App() {
  const inventory = useSelector((state: RootState) => state.inventory.products);
  const loading = useSelector((state: RootState) => state.inventory.loading);
  const error = useSelector((state: RootState) => state.inventory.error);
  const dispatch = useDispatch<AppDispatch>();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    if (!productName.trim()) {
      return;
    }

    dispatch(
      addProduct({
        id: Date.now(),
        title: productName.trim(),
        stock: Number(quantity),
        price: Number(price),
      }),
    );
    setProductName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <>
      {loading && <p>Loading products..</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {inventory.map((product, index) => (
          <li key={index}>
            {product.title} - Quantity: {product.stock} - Price:{" "}
            {product.price}
            <button onClick={() => dispatch(removeProduct(product.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
      />
      ||
      <input
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      ||
      <input
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      ||
      <button onClick={handleAddProduct}>Add Product</button>
    </>
  );
}

export default App;
