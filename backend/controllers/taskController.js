const Task = require("../models/task");
const Project = require("../models/project");

exports.createTask = async (req, res) => {
  try {
    const { type, title, subtitle, description, date, projectId } = req.body;
    const createdBy = req.user.id;

    if (!type || !title || !subtitle || !description || !date || !projectId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = new Task({
      type,
      title,
      subtitle,
      description,
      date,
      project: projectId,
      createdBy,
    });
    await task.save();

    await Project.findByIdAndUpdate(projectId, { $push: { tasks: task.id } });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("project");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error getting task by ID:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksCountByUserAndType = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskType = decodeURIComponent(req.params.type);

    const taskCount = await Task.countDocuments({
      createdBy: userId,
      type: taskType,
    });
    res.status(200).json({ count: taskCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksCountTotalByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const taskCount = await Task.countDocuments({
      createdBy: userId,
    });
    res.status(200).json({ count: taskCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};