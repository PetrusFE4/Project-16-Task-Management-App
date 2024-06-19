import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import "../../styles.css";

const AddTodayTaskCard = ({ onTaskAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    type: "Tugas Hari Ini",
    title: "",
    subtitle: "",
    description: "",
    date: getCurrentDate(),
    projectId: "",
  });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

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

        setProjects(response.data);
      } catch (error) {
        console.error(
          "Error fetching projects:",
          error.response ? error.response.data : error.message
        );
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login first.");
      }
      console.log("Data task yang akan dikirim:", taskData);
      const response = await axios.post(
        "http://localhost:5000/tasks/",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Task created successfully:", response.data.message);
      setTaskData({
        type: "Tugas Hari Ini",
        title: "",
        subtitle: "",
        description: "",
        date: getCurrentDate(),
        projectId: "",
      });
      onTaskAdded();
      toggleForm();
    } catch (error) {
      console.error("Error creating task:", error.message);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="today-task-card">
      {!showForm ? (
        <button className="addTodayTaskButton" onClick={toggleForm}>
          <FaPlus />
          Tambah Tugas
        </button>
      ) : (
        <>
          <h4>Tambahkan Tugas Hari Ini</h4>
          <form onSubmit={handleSubmit}>
            <select
              name="projectId"
              value={taskData.projectId}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Proyek</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="type"
              value={taskData.type}
              onChange={handleChange}
              placeholder="Tipe"
              readOnly
              required
            />
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Judul"
              required
            />
            <input
              type="text"
              name="subtitle"
              value={taskData.subtitle}
              onChange={handleChange}
              placeholder="Subjudul"
              required
            />
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Deskripsi"
              required
            />
            <input
              type="date"
              name="date"
              value={taskData.date}
              onChange={handleChange}
              readOnly
              required
            />
            <button type="submit">Tambahkan</button>
          </form>
        </>
      )}
    </div>
  );
};

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

export default AddTodayTaskCard;
