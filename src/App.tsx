import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { addProduct } from "./features/inventory/inventorySlice";
import { useState } from "react";

function App() {
  const inventory = useSelector((state: RootState) => state.inventory);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");

  const handleAddProduct = () => {
    if (!productName.trim()) {
      return;
    }

    dispatch(addProduct(productName.trim()));
    setProductName("");
  };

  return (
    <>
      <h1>STOCKFLOW</h1>
      <ul>
        {inventory.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
      <input
        type="text"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
      />
      ||
      <button onClick={handleAddProduct}>Add Product</button>
    </>
  );
}

export default App;
