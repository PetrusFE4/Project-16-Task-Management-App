import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "../../styles.css";

const Settings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const fetchUserData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/users/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const userData = response.data;
            setProfile({
              ...profile,
              _id: userData._id,
              username: userData.username,
              email: userData.email,
            });
          } catch (error) {
            console.error("Error fetching user data:", error.message);
            navigate("/login");
          }
        };

        fetchUserData();
      } catch (error) {
        console.error("Error decoding token:", error.message);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/users/${profile._id}`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      Swal.fire({
        icon: "success",
        title: "Perubahan Tersimpan",
        text: response.data.message,
      });
    } catch (error) {
      console.error("Error updating user:", error.message);
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan Perubahan",
        text: "Terjadi kesalahan saat menyimpan perubahan. Silahkan coba lagi.",
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/logout",
        null,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      localStorage.removeItem("token");
      Swal.fire({
        icon: "success",
        title: "Logout Berhasil",
        text: response.data.message,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/users/${profile._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      Swal.fire({
        icon: "success",
        title: "Akun Dihapus",
        text: "Akun Anda berhasil dihapus.",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h3>Pengaturan</h3>
        <ul>
          <li className="profile active">Pengaturan Profil</li>
          <li className="delete-user" onClick={handleDeleteAccount}>
            Hapus Akun
          </li>
          <li className="logout" onClick={handleLogout}>
            Log Out
          </li>
        </ul>
      </div>
      <div className="border"></div>
      <form onSubmit={handleSubmit}>
        <h2>Pengaturan Profil</h2>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default Settings;
