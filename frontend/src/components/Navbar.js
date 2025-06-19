import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/">Home</Link> | <Link to="/cart">Cart ({cartItems.length})</Link>
    </nav>
  );
};

export default Navbar;

