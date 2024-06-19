const Project = require("../models/project");
const Task = require("../models/task");

exports.createProject = async (req, res) => {
  try {
    const { name, title, subtitle, description, date } = req.body;
    const createdBy = req.user.id;

    const project = new Project({
      name,
      title,
      subtitle,
      description,
      date,
      createdBy,
    });
    await project.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id }).populate(
      "members tasks"
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({
      _id: id,
      createdBy: req.user.id,
    }).populate("members tasks");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, subtitle, description, date } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { name, title, subtitle, description, date },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Task.deleteMany({ project: id });

    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectsCountByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectCount = await Project.countDocuments({ createdBy: userId });
    res.status(200).json({ count: projectCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
