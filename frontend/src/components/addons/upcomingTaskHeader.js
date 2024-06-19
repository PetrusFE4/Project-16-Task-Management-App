import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUpcomingTaskContext } from "./taskContext";
import "../../styles.css";

const UpcomingTaskHeader = () => {
  const [totalTasks, setTotalTasks] = useState(0);
  const { upcomingCompletedTaskCount } = useUpcomingTaskContext();
  const [error, setError] = useState(null);

  const fetchTaskCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login first.");
      }

      const response = await axios.get(
        "http://localhost:5000/tasks/task/count/Tugas%20Yang%20Akan%20Datang",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalTasks(response.data.count);
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
    <div className="upcoming-task-header">
      {error && <p className="error-message">{error}</p>}
      <div className="upcoming-task-title">
        <h4>Workspace</h4>
        <h2>Tugas Yang Akan Datang</h2>
      </div>
      <div className="upcoming-task-data">
        <div className="data-item active">
          <p>Semua</p>
          <p>{totalTasks + upcomingCompletedTaskCount}</p>
        </div>
        <div className="data-item">
          <p>Berlangsung</p>
          <p>{totalTasks}</p>
        </div>
        <div className="data-item">
          <p>Selesai</p>
          <p>{upcomingCompletedTaskCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTaskHeader;
