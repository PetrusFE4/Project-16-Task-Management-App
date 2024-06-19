import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      console.log("Daftar Berhasil:", response.data);
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Akun Anda berhasil didaftarkan!",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      if (error.response) {
        console.error("Daftar error:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Registrasi Gagal",
          text: error.response.data.message,
        });
      } else {
        console.error("Terjadi kesalahan:", error.message);
        Swal.fire({
          icon: "error",
          title: "Registrasi Gagal",
          text: "Terjadi kesalahan. Silahkan coba lagi.",
        });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="register-text">
          <h1>Register</h1>
          <p>Selamat datang! Silahkan daftarkan akun anda</p>
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
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
          <button type="submit">Daftar</button>
        </form>
        <p className="login-link">
          Sudah punya akun? <a href="/login">Masuk</a>
        </p>
      </div>
      <div className="register-image">
        <img src="../assets/images/login_daftar.jpg" alt="Login Daftar" />
      </div>
    </div>
  );
};

export default Register;
