import { useEffect, useState } from "react";
import { API } from "../api";

function Resources() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/resources").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Resources</h2>
      {data.map(item => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <a href={`http://localhost:5000/uploads/${item.file}`}>
            Download
          </a>
        </div>
      ))}
    </div>
  );
}

export default Resources;