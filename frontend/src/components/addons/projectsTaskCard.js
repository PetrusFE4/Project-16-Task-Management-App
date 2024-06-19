import React, { useState, useEffect } from "react";
import { FaBell, FaClock, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { useProjectContext } from "./projectContext";
import "../../styles.css";

const ProjectsTaskCard = ({
  id,
  name,
  title,
  subtitle,
  description,
  date,
  onDelete,
  onProjectComplete,
}) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const { updateCompletedProjectCount } = useProjectContext();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login first.");
      }

      await axios.delete(`http://localhost:5000/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof updateCompletedProjectCount === "function") {
        updateCompletedProjectCount();
      }

      setIsCompleted(true);

      if (typeof onDelete === "function") {
        onDelete(id);
      }

      if (typeof onProjectComplete === "function") {
        onProjectComplete(id);
      }
    } catch (error) {
      console.error(
        "Error completing project:",
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
    <div className="projects-task-card">
      <h5>{name}</h5>
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
        {!isCompleted && (
          <button
            className={`complete-btn ${isCompleted ? "disabled" : ""}`}
            onClick={handleComplete}
          >
            <FaCheckCircle /> Selesai
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectsTaskCard;
