import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>All Guitars</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((p) => (
          <Link
            to={`/product/${p._id}`}
            key={p._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
              <img src={p.image} alt={p.name} width="200" height="150" />
              <br/> <strong>{p.name}</strong>
              <br />
              <em>{p.category}</em>
              <br />₹{p.price}
              <br />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
