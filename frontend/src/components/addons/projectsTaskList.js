import React, { useState, useEffect } from "react";
import ProjectsTaskCard from "./projectsTaskCard";
import axios from "axios";
import "../../styles.css";

const ProjectsTaskList = () => {
  const [projectsTasks, setProjectsTasks] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, please login first.");
        }

        const response = await axios.get("http://localhost:5000/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjectsTasks(response.data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchProjects();
  }, [refresh]);

  const handleProjectComplete = (projectId) => {
    setProjectsTasks((prevTasks) =>
      prevTasks.filter((project) => project._id !== projectId)
    );
    setRefresh((prev) => !prev);
  };

  return (
    <div className="projects-task-list">
      {error && <p className="error-message">{error}</p>}
      <div className="projects-tasks">
        {projectsTasks.map((projectTask) => (
          <ProjectsTaskCard
            key={projectTask._id}
            id={projectTask._id}
            name={projectTask.name || "N/A"}
            title={projectTask.title || "N/A"}
            subtitle={projectTask.subtitle || "N/A"}
            description={projectTask.description || "N/A"}
            date={projectTask.date || "N/A"}
            onDelete={handleProjectComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsTaskList;
