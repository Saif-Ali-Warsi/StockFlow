import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "./app/store";
import {
  fetchProducts,
  addProduct,
  removeProduct,
  type Product,
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
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

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

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setProductName(product.title);
    setQuantity(String(product.stock));
    setPrice(String(product.price));
  };

  return (
    <div className="min-h-screen bg-[#EBECF0] p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-[#61677C] drop-shadow-[1px_1px_1px_#FFFFFF]">
           Redux Inventory Management
          </h1>
          <p className="text-sm text-[#A0A5B5] mt-1 drop-shadow-[1px_1px_1px_#FFFFFF]">
            Add, edit, and track your store inventory seamlessly.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-[#EBECF0] p-6 rounded-2xl text-center shadow-[inset_2px_2px_5px_#BABECC,inset_-5px_-5px_10px_#FFFFFF]">
            <p className="text-sm font-semibold text-[#61677C]">
              Loading products...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[#EBECF0] p-6 rounded-2xl text-center shadow-[inset_2px_2px_5px_#EF4444,inset_-5px_-5px_10px_#FFFFFF]">
            <p className="text-sm font-semibold text-red-500">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-8">
            {/* Add / Edit Form Panel */}
            <div className="bg-[#EBECF0] p-6 sm:p-8 rounded-3xl shadow-[10px_10px_20px_#BABECC,-10px_-10px_20px_#FFFFFF]">
              <h2 className="text-lg font-bold text-[#61677C] mb-4 drop-shadow-[1px_1px_1px_#FFFFFF]">
                Product Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Product Name Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#61677C] mb-2 drop-shadow-[1px_1px_1px_#FFFFFF]">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    className="w-full px-4 py-3 bg-[#EBECF0] rounded-2xl text-sm text-[#61677C] placeholder-[#A0A5B5] focus:outline-none shadow-[inset_2px_2px_5px_#BABECC,inset_-5px_-5px_10px_#FFFFFF] focus:shadow-[inset_1px_1px_2px_#BABECC,inset_-1px_-1px_2px_#FFFFFF] transition-all"
                  />
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#61677C] mb-2 drop-shadow-[1px_1px_1px_#FFFFFF]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="w-full px-4 py-3 bg-[#EBECF0] rounded-2xl text-sm text-[#61677C] placeholder-[#A0A5B5] focus:outline-none shadow-[inset_2px_2px_5px_#BABECC,inset_-5px_-5px_10px_#FFFFFF] focus:shadow-[inset_1px_1px_2px_#BABECC,inset_-1px_-1px_2px_#FFFFFF] transition-all"
                  />
                </div>

                {/* Price Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#61677C] mb-2 drop-shadow-[1px_1px_1px_#FFFFFF]">
                    Price (AED)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="w-full px-4 py-3 bg-[#EBECF0] rounded-2xl text-sm text-[#61677C] placeholder-[#A0A5B5] focus:outline-none shadow-[inset_2px_2px_5px_#BABECC,inset_-5px_-5px_10px_#FFFFFF] focus:shadow-[inset_1px_1px_2px_#BABECC,inset_-1px_-1px_2px_#FFFFFF] transition-all"
                  />
                </div>
              </div>

              {/* Add/Save Button */}
              <button
                onClick={handleAddProduct}
                className="cursor-pointer w-full bg-[#EBECF0] text-[#61677C] font-bold py-3.5 px-4 rounded-2xl text-sm shadow-[-5px_-5px_15px_#FFFFFF,5px_5px_15px_#BABECC] hover:shadow-[-2px_-2px_5px_#FFFFFF,2px_2px_5px_#BABECC] active:shadow-[inset_1px_1px_2px_#BABECC,inset_-1px_-1px_2px_#FFFFFF] transition-all flex items-center justify-center"
              >
                Add Product
              </button>
            </div>

            {/* Inventory List Section */}
            <div className="bg-[#EBECF0] p-6 sm:p-8 rounded-3xl shadow-[10px_10px_20px_#BABECC,-10px_-10px_20px_#FFFFFF]">
              <h2 className="text-lg font-bold text-[#61677C] mb-6 drop-shadow-[1px_1px_1px_#FFFFFF]">
                Inventory List ({inventory.length})
              </h2>

              {inventory.length === 0 ? (
                <p className="text-sm text-[#A0A5B5] text-center py-6">
                  No products found in inventory.
                </p>
              ) : (
                <ul className="space-y-4">
                  {inventory.map((product, index) => (
                    <li
                      key={index}
                      className="bg-[#EBECF0] p-4 sm:p-5 rounded-2xl shadow-[inset_2px_2px_5px_#BABECC,inset_-5px_-5px_10px_#FFFFFF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Details Display */}
                      <div className="space-y-1">
                        <h3 className="font-bold text-[#61677C] text-base drop-shadow-[1px_1px_1px_#FFFFFF]">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-[#A0A5B5]">
                          <span>
                            Quantity:{" "}
                            <strong className="text-[#61677C]">
                              {product.stock}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>
                            Price:{" "}
                            <strong className="text-[#61677C]">
                              AED {product.price}
                            </strong>
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="cursor-pointer flex-1 sm:flex-initial bg-[#EBECF0] text-[#61677C] font-semibold py-2 px-4 rounded-xl text-xs shadow-[-4px_-4px_10px_#FFFFFF,4px_4px_10px_#BABECC] hover:shadow-[-2px_-2px_4px_#FFFFFF,2px_2px_4px_#BABECC] active:shadow-[inset_1px_1px_2px_#BABECC,inset_-1px_-1px_2px_#FFFFFF] transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => dispatch(removeProduct(product.id))}
                          className="cursor-pointer flex-1 sm:flex-initial bg-[#EBECF0] text-red-500 font-semibold py-2 px-4 rounded-xl text-xs shadow-[-4px_-4px_10px_#FFFFFF,4px_4px_10px_#BABECC] hover:shadow-[-2px_-2px_4px_#FFFFFF,2px_2px_4px_#BABECC] active:shadow-[inset_1px_1px_2px_#BABECC,inset_-1px_-1px_2px_#FFFFFF] transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
