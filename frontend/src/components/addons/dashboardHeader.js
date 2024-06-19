import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTodayTaskContext, useUpcomingTaskContext } from "./taskContext";
import "../../styles.css";

const DashboardHeader = () => {
  const [totalTask, setTotalTasks] = useState(0);
  const [todayTask, setTasksToday] = useState(0);
  const [upcomingTask, setTasksUpcoming] = useState(0);
  const { todayCompletedTaskCount } = useTodayTaskContext();
  const { upcomingCompletedTaskCount } = useUpcomingTaskContext();
  const [error, setError] = useState(null);

  const fetchTotalTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login first.");
      }

      const response = await axios.get(
        "http://localhost:5000/tasks/task/countall",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalTasks(response.data.count);
    } catch (error) {
      console.error(
        "Error fetching total task count:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const fetchTodayTaskCount = async () => {
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

      setTasksToday(response.data.count);
    } catch (error) {
      console.error(
        "Error fetching task count:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const fetchUpcomingTaskCount = async () => {
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

      setTasksUpcoming(response.data.count);
    } catch (error) {
      console.error("Error fetching task count:", error.message);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    fetchTotalTasks();
    fetchTodayTaskCount();
    fetchUpcomingTaskCount();

    const interval = setInterval(() => {
      fetchTotalTasks();
      fetchTodayTaskCount();
      fetchUpcomingTaskCount();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-header">
      <div className="dashboard-title">
        <h4>Workspace</h4>
        <h2>Dasbor</h2>
      </div>
      <div className="dashboard-stats">
        <div className="stat-item">
          <h3>{todayTask}</h3>
          <p>Tugas Hari Ini</p>
        </div>
        <div className="stat-item">
          <h3>{upcomingTask}</h3>
          <p>Tugas Yang Akan Datang</p>
        </div>
      </div>
      <div className="dashboard-data">
        <div className="data-item active">
          <p>Semua</p>
          <p>
            {totalTask + todayCompletedTaskCount + upcomingCompletedTaskCount}
          </p>
        </div>
        <div className="data-item">
          <p>Berlangsung</p>
          <p>{totalTask}</p>
        </div>
        <div className="data-item">
          <p>Selesai</p>
          <p>{todayCompletedTaskCount + upcomingCompletedTaskCount}</p>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DashboardHeader;
