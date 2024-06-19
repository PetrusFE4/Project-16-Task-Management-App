import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTodayTaskContext } from "./taskContext";
import "../../styles.css";

const TodayTaskHeader = () => {
  const [taskCount, setTaskCount] = useState(0);
  const { todayCompletedTaskCount } = useTodayTaskContext();
  const [error, setError] = useState(null);

  const fetchTaskCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login first.");
      }

      const response = await axios.get(
        "http://localhost:5000/tasks/task/count/Tugas%20Hari%20Ini",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTaskCount(response.data.count);
    } catch (error) {
      console.error(
        "Error fetching task count:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    fetchTaskCount();

    const interval = setInterval(() => {
      fetchTaskCount();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="today-task-header">
      {error && <p className="error-message">{error}</p>}
      <div className="today-task-title">
        <h4>Workspace</h4>
        <h2>Tugas Hari Ini</h2>
      </div>
      <div className="today-task-data">
        <div className="data-item">
          <p>Semua</p>
          <p>{taskCount + todayCompletedTaskCount}</p>
        </div>
        <div className="data-item">
          <p>Berlangsung</p>
          <p>{taskCount}</p>
        </div>
        <div className="data-item">
          <p>Selesai</p>
          <p>{todayCompletedTaskCount}</p>
        </div>
      </div>
    </div>
  );
};

export default TodayTaskHeader;
