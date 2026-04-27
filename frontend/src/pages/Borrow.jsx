import { useEffect, useState } from "react";
import { API } from "../api";

function Borrow() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  //  SAFE USER
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    API.get("/borrow").then((res) => setItems(res.data));
  };

  //  ADD ITEM
  const addItem = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!name.trim()) {
      alert("Item name required");
      return;
    }

    await API.post("/borrow", { itemName: name });
    setName("");
    fetchItems();
  };

  //  REQUEST ITEM
  const requestItem = async (id) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    await API.put(`/borrow/${id}/request`);
    fetchItems();
  };

  //  APPROVE ITEM
  const approveItem = async (id) => {
    await API.put(`/borrow/${id}/approve`);
    fetchItems();
  };

  //  IF NOT LOGGED IN
  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h4>Please login to use Borrow feature</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2> Borrow System</h2>

      {/* ADD ITEM */}
      <div className="card p-3 mb-3">
        <input
          value={name}
          className="form-control mb-2"
          placeholder="Enter item name"
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* LIST */}
      {items?.length === 0 && <p>No items available</p>}

      {items
        .filter((item) => item.itemName?.trim())
        .map((item) => (
          <div key={item._id} className="card p-3 mb-2">
            <h5>{item.itemName}</h5>

            {/* STATUS */}
            <span
              className={`badge ${
                item.status === "available"
                  ? "bg-success"
                  : item.status === "requested"
                  ? "bg-warning"
                  : "bg-danger"
              }`}
            >
              {item.status}
            </span>

            {/* REQUEST BUTTON */}
            {item.status === "available" && (
              <button
                className="btn btn-warning mt-2"
                onClick={() => requestItem(item._id)}
              >
                Request
              </button>
            )}

            {/* APPROVE BUTTON (ONLY OWNER) */}
            {item.owner === user?._id &&
              item.status === "requested" && (
                <button
                  className="btn btn-success mt-2"
                  onClick={() => approveItem(item._id)}
                >
                  Approve
                </button>
              )}
          </div>
        ))}
    </div>
  );
}

export default Borrow;