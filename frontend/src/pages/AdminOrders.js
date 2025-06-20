import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 All Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "20px",
            padding: "10px",
          }}
        >
          <p>
            <strong>🧑 Name:</strong> {order.userName}
          </p>
          <p>
            <strong>📧 Email:</strong> {order.userEmail}
          </p>
          <p>
            <strong>🕒 Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>💰 Total:</strong> ₹{order.total}
          </p>

          <h4>🎸 Items:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
