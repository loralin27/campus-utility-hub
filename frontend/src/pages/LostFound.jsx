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
    API.get("/lost").then((res) => setItems(res.data));
  };

  // ➕ ADD ITEM
  const addItem = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!form.title || !form.title.trim()) {
      alert("Title required");
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    await API.post("/lost", formData);
    fetchItems();
  };

  // 🔄 MARK FOUND
  const claimItem = async (id) => {
    await API.put(`/lost/${id}/claim`);
    fetchItems();
  };

  // ❌ DELETE
  const deleteItem = async (id) => {
    await API.delete(`/lost/${id}`);
    fetchItems();
  };

  // 🔒 NOT LOGGED IN UI
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
      <div className="card p-3 mb-3">
        <input
          placeholder="Title"
          className="form-control mb-2"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Description"
          className="form-control mb-2"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Location"
          className="form-control mb-2"
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          placeholder="Contact"
          className="form-control mb-2"
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

        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* LIST */}
      {items
        .filter((i) => i.title?.trim())
        .map((item) => (
          <div key={item._id} className="card p-3 mb-2">
            <h5>{item.title}</h5>
            <p>{item.description}</p>

            {item.image && (
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                width="120"
                alt=""
              />
            )}

            {/* STATUS */}
            <span
              className={`badge ${
                item.status === "lost"
                  ? "bg-danger"
                  : "bg-success"
              }`}
            >
              {item.status}
            </span>

            {/* OWNER ACTIONS (SAFE CHECK) */}
            {item.user === user?._id && (
              <>
                {item.status === "lost" && (
                  <button
                    className="btn btn-warning mt-2 me-2"
                    onClick={() => claimItem(item._id)}
                  >
                    Mark Found
                  </button>
                )}

                <button
                  className="btn btn-danger mt-2"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
    </div>
  );
}

export default LostFound;