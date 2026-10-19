import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { fetchProducts, addProduct, removeProduct } from "./features/inventory/inventorySlice";
import { useEffect, useState } from "react";

function App() {
  const inventory = useSelector((state: RootState) => state.inventory.products);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  const handleAddProduct = () => {
    if (!productName.trim()) {
      return;
    }

    dispatch(addProduct({
      name: productName.trim(),
      quantity: Number(quantity),
      price: Number(price)
    }));
    setProductName("");
    setQuantity("");
    setPrice("")
  };

  return (
    <>
      <h1>STOCKFLOW</h1>
      <ul>
        {inventory.map((product, index) => (
          <li key={index}>{product.title} -
            Quantity: {product.quantity} -
            Price: {product.price}
            <button onClick={() => dispatch(removeProduct(product.name))}>
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
      <input type="number" value={quantity} onChange={(event) =>
        setQuantity(event.target.value)} />
      ||
      <input type="number" value={price} onChange={(event) =>
        setPrice(event.target.value)} />
      ||
      <button onClick={handleAddProduct}>Add Product</button>
    </>
  );
}

export default App;
