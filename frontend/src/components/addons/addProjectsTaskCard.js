import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const AddProjectsTaskCard = ({ onProjectAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    title: "",
    subtitle: "",
    description: "",
    date: getCurrentDate(),
  });

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
      await axios.post("http://localhost:5000/projects", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Project created successfully");
      setTaskData({
        name: "",
        title: "",
        subtitle: "",
        description: "",
        date: getCurrentDate(),
      });
      onProjectAdded();
      toggleForm();
    } catch (error) {
      console.error("Error creating project:", error.message);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="projects-task-card">
      {!showForm ? (
        <button className="addProjectsTaskButton" onClick={toggleForm}>
          <FaPlus />
          Tambah Proyek
        </button>
      ) : (
        <>
          <h4>Tambahkan Proyek</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={taskData.name}
              onChange={handleChange}
              placeholder="Nama Proyek"
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
              min={getCurrentDate()}
              onChange={handleChange}
              placeholder="Tanggal"
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

export default AddProjectsTaskCard;
