import { useEffect, useState } from "react";
import { API } from "../api";

function LostFound() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/lost").then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>Lost & Found</h2>
      {items.map(item => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default LostFound;