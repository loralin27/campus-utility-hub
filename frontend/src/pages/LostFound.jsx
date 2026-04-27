import { useEffect, useState } from "react";
import { API } from "../api";

function LostFound() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    API.get("/lost")
      .then((res) => setItems(res.data))
      .catch(() => alert("Failed to load items"));
  };

  //  ADD ITEM
  const addItem = async () => {
    if (!user) return alert("Please login first");

    if (!form.title || !form.title.trim()) {
      return alert("Title required");
    }

    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }

      await API.post("/lost", formData);

      setForm({}); //  RESET FORM
      fetchItems();
    } catch {
      alert("Error adding item");
    }
  };

  // MARK FOUND
  const claimItem = async (id) => {
    try {
      await API.put(`/lost/${id}/claim`);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // ❌ DELETE
  const deleteItem = async (id) => {
    try {
      await API.delete(`/lost/${id}`);
      fetchItems();
    } catch {
      alert("Delete failed");
    }
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h4>Please login to use Lost & Found</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>🔍 Lost & Found</h2>

      {/* FORM */}
      <div className="card p-3 mb-4 shadow-sm">
        <input
          placeholder="Title"
          className="form-control mb-2"
          value={form.title || ""}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Description"
          className="form-control mb-2"
          value={form.description || ""}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Location"
          className="form-control mb-2"
          value={form.location || ""}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          placeholder="Contact"
          className="form-control mb-2"
          value={form.contact || ""}
          onChange={(e) =>
            setForm({ ...form, contact: e.target.value })
          }
        />

        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <button className="btn btn-primary w-25" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* LIST */}
      {items
        .filter((i) => i.title?.trim())
        .map((item) => (
          <div key={item._id} className="card p-3 mb-3 shadow-sm">

            <h5>{item.title}</h5>

            {item.description && (
              <p className="text-muted mb-1">{item.description}</p>
            )}

            {item.location && (
              <small className="text-secondary">
                📍 {item.location}
              </small>
            )}

            {item.image && (
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                width="120"
                className="mt-2 rounded"
                alt=""
              />
            )}

            {/* STATUS */}
            <div className="mt-2">
              <span
                className={`badge ${
                  item.status === "lost"
                    ? "bg-danger"
                    : "bg-success"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* OWNER ACTIONS */}
            {item.user === user?._id && (
              <div className="mt-3">
                {item.status === "lost" && (
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => claimItem(item._id)}
                  >
                    Mark Found
                  </button>
                )}

                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default LostFound;