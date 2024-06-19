const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/environment");
const connectDB = require("./database/databaseConnection");
const taskRoutes = require("./routes/taskRoute");
const projectRoutes = require("./routes/projectRoute");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

connectDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
