import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda berhasil login",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Login error:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: error.response.data.message,
        });
      } else {
        console.error("Terjadi kesalahan:", error.message);
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Terjadi kesalahan. Silahkan coba lagi.",
        });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="../assets/images/login_daftar.jpg" alt="Login Daftar" />
      </div>
      <div className="login-form">
        <div className="login-text">
          <h1>Login</h1>
          <p>Selamat datang kembali! Silahkan login ke akun anda</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Pengguna baru? <a href="/register">Daftar</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
