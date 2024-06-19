import React, { useState, useEffect } from "react";
import { FaBell, FaClock, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { useTodayTaskContext } from "./taskContext";
import "../../styles.css";

const TodayTaskCard = ({
  id,
  type,
  title,
  subtitle,
  description,
  date,
  onDelete,
  onTaskComplete,
}) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const { updateTodayCompletedTaskCount } = useTodayTaskContext();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login first.");
      }

      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof updateTodayCompletedTaskCount === "function") {
        updateTodayCompletedTaskCount();
      }

      setIsCompleted(true);

      if (typeof onDelete === "function") {
        onDelete(id);
      }

      if (typeof onTaskComplete === "function") {
        onTaskComplete(id);
      }
    } catch (error) {
      console.error(
        "Error completing task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        setIsCompleted(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  return (
    <div className="today-task-card">
      <h5>{type}</h5>
      <h6>{title}</h6>
      <h6>{subtitle}</h6>
      <p>{description}</p>
      <div className="task-footer">
        <button className="remind-btn">
          <FaBell /> Ingatkan Saya
        </button>
        <div className="task-date">
          <FaClock /> {formatDate(date)}
        </div>
        <button
          className={`complete-btn ${isCompleted ? "disabled" : ""}`}
          onClick={handleComplete}
        >
          <FaCheckCircle /> Selesai
        </button>
      </div>
    </div>
  );
};

export default TodayTaskCard;
