import { useEffect, useState } from "react";
import { API } from "../api";

function Borrow() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/borrow").then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>Borrow Items</h2>
      {items.map(item => (
        <div key={item._id}>
          <h3>{item.itemName}</h3>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Borrow;