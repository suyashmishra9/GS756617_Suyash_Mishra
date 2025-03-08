import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addSKU, deleteSKU } from "../redux/slices/skuSlice";
import { FaTrash } from "react-icons/fa";

const SKUs = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.sku.skus);
  const [showModal, setShowModal] = useState(false);
  const [newSKU, setNewSKU] = useState({ name: "", price: "", cost: "" });

  const handleAddSKU = () => {
    if (!newSKU.name || !newSKU.price || !newSKU.cost) return;
    dispatch(addSKU({ name: newSKU.name, price: Number(newSKU.price), cost: Number(newSKU.cost) }));
    setShowModal(false);
    setNewSKU({ name: "", price: "", cost: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SKU Management</h1>
      <table className="w-[60%] ml-6 border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-200">
      <th className="p-2 border w-1/12"></th>
      <th className="p-2 border w-2/3">SKU</th>
      <th className="p-2 border w-1/6">Price</th>
      <th className="p-2 border w-1/6">Cost</th>
    </tr>
  </thead>
  <tbody>
    {skus.map((sku, index) => (
      <tr key={sku.id} className="border">
        <td className="p-2 text-center border">
          <div className="flex items-center justify-between">
            <button onClick={() => dispatch(deleteSKU(sku.id))} className="text-black cursor-pointer">
              <FaTrash />
            </button>
          </div>
        </td>
        <td className="p-2 border">{sku.name}</td>
        <td className="p-2 border">{sku.price}</td>
        <td className="p-2 border">{sku.cost}</td>
      </tr>
    ))}
  </tbody>
</table>


      <button className="fixed bottom-6 left-70 bg-[#ffab91] text-black px-6 py-3 rounded-full shadow-lg font-medium cursor-pointer" onClick={() => setShowModal(true)}>
        New SKU
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add SKU</h2>
            <input type="text" placeholder="SKU Name" className="border p-2 w-full mb-2" value={newSKU.name} onChange={(e) => setNewSKU({ ...newSKU, name: e.target.value })} />
            <input type="number" placeholder="Price" className="border p-2 w-full mb-2" value={newSKU.price} onChange={(e) => setNewSKU({ ...newSKU, price: e.target.value })} />
            <input type="number" placeholder="Cost" className="border p-2 w-full mb-2" value={newSKU.cost} onChange={(e) => setNewSKU({ ...newSKU, cost: e.target.value })} />
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white p-2 rounded cursor-pointer">Cancel</button>
              <button onClick={handleAddSKU} className="bg-green-400 text-white p-2 rounded cursor-pointer">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SKUs;
