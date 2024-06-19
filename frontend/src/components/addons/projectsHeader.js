import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProjectContext } from "./projectContext";
import "../../styles.css";

const ProjectsHeader = () => {
  const [projectCount, setProjectCount] = useState(0);
  const { completedProjectCount } = useProjectContext();
  const [error, setError] = useState(null);

  const fetchProjectCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login first.");
      }

      const response = await axios.get("http://localhost:5000/projects/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjectCount(response.data.count);
    } catch (error) {
      console.error(
        "Error fetching task count:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    fetchProjectCount();

    const interval = setInterval(() => {
      fetchProjectCount();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="projects-header">
      {error && <p className="error-message">{error}</p>}
      <div className="projects-title">
        <h4>Workspace</h4>
        <h2>Semua Proyek</h2>
        <p>
          Klik <span>+ Tambah Proyek</span> untuk membuat daftar baru. <br />
          Jangan membuat kartu sendiri untuk mengelola kolaborasi yang baik.
        </p>
      </div>
      <div className="projects-data">
        <div className="data-item active">
          <p>Semua</p>
          <p>{projectCount + completedProjectCount}</p>
        </div>
        <div className="data-item">
          <p>Berlangsung</p>
          <p>{projectCount}</p>
        </div>
        <div className="data-item">
          <p>Selesai</p>
          <p>{completedProjectCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHeader;
