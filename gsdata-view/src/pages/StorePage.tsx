import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newStore, setNewStore] = useState({ name: "", city: "", state: "" });

  useEffect(() => {
    const savedStores = JSON.parse(localStorage.getItem("stores") || "[]");
    setStores(savedStores);
  }, []);

  const saveToLocalStorage = (updatedStores: Store[]) => {
    localStorage.setItem("stores", JSON.stringify(updatedStores));
  };

  const addStore = () => {
    if (!newStore.name || !newStore.city || !newStore.state) return;
    const updatedStores = [
      ...stores,
      { id: stores.length + 1, ...newStore },
    ];
    setStores(updatedStores);
    saveToLocalStorage(updatedStores);
    setShowModal(false);
    setNewStore({ name: "", city: "", state: "" });
  };

  const deleteStore = (id: number) => {
    const updatedStores = stores.filter((store) => store.id !== id);
    setStores(updatedStores);
    saveToLocalStorage(updatedStores);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stores</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">S.No</th>
              <th className="p-2 border">Store</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">State</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr key={store.id} className="border">
                <td className="p-2 text-center border">{index + 1}</td>
                <td className="p-2 border">{store.name}</td>
                <td className="p-2 border">{store.city}</td>
                <td className="p-2 border">{store.state}</td>
                <td className="p-2 text-center border">
                  <button onClick={() => deleteStore(store.id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg"
        onClick={() => setShowModal(true)}
      >
        <FaPlus />
      </button>

      {/* Modal for Adding Store */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Store</h2>
            <input
              type="text"
              placeholder="Store Name"
              className="border p-2 w-full mb-2"
              value={newStore.name}
              onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="border p-2 w-full mb-2"
              value={newStore.city}
              onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              className="border p-2 w-full mb-2"
              value={newStore.state}
              onChange={(e) => setNewStore({ ...newStore, state: e.target.value })}
            />
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)} className="mr-2">Cancel</button>
              <button onClick={addStore} className="bg-blue-500 text-white p-2 rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores;
  