import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UpcomingTaskCard from "./upcomingTaskCard";
import "../../styles.css";

const UpcomingTaskList = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, please login first.");
        }

        const response = await axios.get("http://localhost:5000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredTasks = response.data.filter(
          (task) =>
            task.type === "Tugas Yang Akan Datang" &&
            task.createdBy === getUserId(token)
        );

        setUpcomingTasks(filteredTasks);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchTasks();
  }, [refresh]);

  const handleTaskComplete = (taskId) => {
    setUpcomingTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== taskId)
    );
    setRefresh((prev) => !prev);
  };

  const getUserId = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  };

  return (
    <div className="upcoming-task-list">
      {error && <p className="error-message">{error}</p>}
      <div className="upcoming-tasks">
        {upcomingTasks.map((upcomingTask) => (
          <UpcomingTaskCard
            key={upcomingTask._id}
            id={upcomingTask._id}
            type={upcomingTask.type || "N/A"}
            title={upcomingTask.title || "N/A"}
            subtitle={upcomingTask.subtitle || "N/A"}
            description={upcomingTask.description || "N/A"}
            date={upcomingTask.date || "N/A"}
            onTaskComplete={handleTaskComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTaskList;
