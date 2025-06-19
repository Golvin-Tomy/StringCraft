import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
 const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} style={{ border: "1px solid gray", marginBottom: 10, padding: 10 }}>
              <img src={item.image} alt={item.name} width="100" />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <label>
                Quantity:{" "}
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                />
              </label>
              <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: "10px" }}>
                ❌ Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

