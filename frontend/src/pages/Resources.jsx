import { useEffect, useState } from "react";
import { API } from "../api";

function Resources() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchResources = async () => {
    const res = await API.get("/resources");
    setData(res.data);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const addResource = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    await API.post("/resources", formData);
    alert("Uploaded!");
    fetchResources();
  };

  const deleteResource = async (id) => {
    await API.delete(`/resources/${id}`);
    fetchResources();
  };

  return (
    <div>
      <h2 className="mb-4">📚 Resources</h2>

      {/* Upload */}
      <div className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="btn btn-primary" onClick={addResource}>
          Upload
        </button>
      </div>

      {/* List */}
      <div className="row">
        {data.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card p-3 shadow">
              <h5>{item.title}</h5>

              <a
                href={`http://localhost:5000/uploads/${item.file}`}
                className="btn btn-primary mt-2"
              >
                Download
              </a>

              {((item.user && item.user._id) || item.user) === currentUser?._id && (
                <button
                  className="btn btn-danger mt-2 ms-2"
                  onClick={() => deleteResource(item._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;