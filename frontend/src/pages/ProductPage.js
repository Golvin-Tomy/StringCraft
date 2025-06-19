import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [error, setError] = useState(null);

useEffect(() => {
  console.log("🔍 Fetching product with ID:", id);
  axios
    .get(`http://localhost:5000/api/products/${id}`)
    .then((res) => {
      console.log("Product fetched:", res.data); 
      setProduct(res.data);
    })
    .catch((err) => {
      console.error("Error fetching product:", err);
    });
}, [id]);



if (error) return <p>{error}</p>;
if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <img src={product.image} alt={product.name} width="300" />
      <br />
      <h2>{product.name}</h2>
      <h4>Category: {product.category}</h4>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>

      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
