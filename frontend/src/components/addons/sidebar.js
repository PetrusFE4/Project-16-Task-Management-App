import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaBuromobelexperte,
  FaChartBar,
  FaGear,
  FaCalendar,
  FaCalendarDay,
  FaLayerGroup,
  FaDoorOpen,
  FaAngleRight,
} from "react-icons/fa6";
import "../../styles.css";

const Sidebar = ({ setActiveMenu }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUsername("Guest");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:5000/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data;
        setUsername(userData.username || "Guest");
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setUsername("Guest");
      }
    };

    fetchUserData();
  }, []);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setActiveMenuItem(menu);
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
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <div className="user-section">
          <img
            src="/assets/images/avatar.png"
            alt="Avatar"
            className="avatar"
          />
          <h6>{username}</h6>
        </div>
        <div className="menu-section">
          <button href="#" className="menu-item active">
            <FaBuromobelexperte /> Workspace
          </button>
        </div>
        <div className="menu-section">
          <button
            className={`menu-item ${
              activeMenuItem === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("dashboard")}
          >
            <FaChartBar /> Dasbor
          </button>
          <button
            className={`menu-item ${
              activeMenuItem === "settings" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("settings")}
          >
            <FaGear /> Pengaturan
          </button>
        </div>
        <div className="menu-section">
          <button
            className={`menu-item ${
              activeMenuItem === "today-tasks" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("today-tasks")}
          >
            <FaCalendar /> Tugas Hari Ini
          </button>
          <button
            className={`menu-item ${
              activeMenuItem === "upcoming-tasks" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("upcoming-tasks")}
          >
            <FaCalendarDay /> Tugas Yang Akan Datang
          </button>
          <button
            className={`menu-item ${
              activeMenuItem === "projects" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("projects")}
          >
            <FaLayerGroup /> Semua Proyek
          </button>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <FaDoorOpen /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
