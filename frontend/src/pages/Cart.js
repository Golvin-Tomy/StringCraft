import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Cart = () => {
  const { cartItems, setCartItems, updateQuantity, removeFromCart } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const items = cartItems.map(({ _id, name, price, quantity, image }) => ({
      productId: _id,
      name,
      price,
      quantity,
      image,
    }));

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post("http://localhost:5000/api/orders/place", {
        items,
        total,
        userName: user.name,
        userEmail: user.email,
      });

      alert("✅ Order placed successfully!");
      setCartItems([]);
    } catch (err) {
      console.error("❌ Order failed:", err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                marginBottom: 10,
                padding: 10,
              }}
            >
              <img src={item.image} alt={item.name} width="100" />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <label>
                Quantity:{" "}
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item._id, parseInt(e.target.value))
                  }
                />
              </label>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{ marginLeft: "10px" }}
              >
                ❌ Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button>Proceed to Checkout</button>
          {cartItems.length > 0 && (
            <button onClick={handlePlaceOrder} style={{ marginTop: "1rem" }}>
              🛒 Place Order
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
