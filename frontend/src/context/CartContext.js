import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      setCartItems(cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
  setCartItems(cartItems.filter((item) => item._id !== productId));
};

const updateQuantity = (productId, quantity) => {
  setCartItems(
    cartItems.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    )
  );
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
