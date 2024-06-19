import React, { useState, useEffect } from "react";
import TodayTaskCard from "./todayTaskCard";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../../styles.css";

const TodayTaskList = () => {
  const [todayTasks, setTodayTasks] = useState([]);
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
            task.type === "Tugas Hari Ini" &&
            task.createdBy === getUserId(token)
        );

        setTodayTasks(filteredTasks);
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
    setTodayTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== taskId)
    );
    setRefresh((prev) => !prev);
  };

  const getUserId = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  };

  return (
    <div className="today-task-list">
      {error && <p className="error-message">{error}</p>}
      <div className="today-tasks">
        {todayTasks.map((todayTask) => (
          <TodayTaskCard
            key={todayTask._id}
            id={todayTask._id}
            type={todayTask.type || "N/A"}
            title={todayTask.title || "N/A"}
            subtitle={todayTask.subtitle || "N/A"}
            description={todayTask.description || "N/A"}
            date={todayTask.date || "N/A"}
            onTaskComplete={handleTaskComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayTaskList;
