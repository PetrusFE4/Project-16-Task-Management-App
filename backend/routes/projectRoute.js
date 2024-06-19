const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, projectController.createProject);
router.get("/count", authMiddleware, projectController.getProjectsCountByUser);
router.get("/", authMiddleware, projectController.getProjects);
router.get("/:id", authMiddleware, projectController.getProjectById);
router.put("/:id", authMiddleware, projectController.updateProject);
router.delete("/:id", authMiddleware, projectController.deleteProject);

module.exports = router;
