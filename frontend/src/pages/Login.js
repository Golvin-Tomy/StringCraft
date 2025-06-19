import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
