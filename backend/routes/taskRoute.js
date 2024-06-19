const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, taskController.createTask);
router.get("/task/countall", authMiddleware, taskController.getTasksCountTotalByUser);
router.get("/task/count/:type", authMiddleware, taskController.getTasksCountByUserAndType);
router.get("/", authMiddleware, taskController.getTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.put("/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
