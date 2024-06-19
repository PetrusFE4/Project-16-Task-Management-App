import React, { useState } from "react";
import "../styles.css";
import Sidebar from "./addons/sidebar";
import DashboardHeader from "./addons/dashboardHeader";
import SettingsHeader from "./addons/settingsHeader";
import Settings from "./addons/settings";
import TodayTaskHeader from "./addons/todayTaskHeader";
import TodayTaskList from "./addons/todayTaskList";
import AddTodayTaskCard from "./addons/addTodayTaskCard";
import UpcomingTaskHeader from "./addons/upcomingTaskHeader";
import UpcomingTaskList from "./addons/upcomingTaskList";
import AddUpcomingTaskCard from "./addons/addUpcomingTaskCard";
import ProjectsHeader from "./addons/projectsHeader";
import ProjectsTaskList from "./addons/projectsTaskList";
import AddProjectsTaskCard from "./addons/addProjectsTaskCard";
import HeaderList from "./addons/headerList";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [refreshTodayTasks, setRefreshTodayTasks] = useState(false);
  const [refreshUpcomingTasks, setRefreshUpcomingTasks] = useState(false);
  const [refreshProject, setRefreshProject] = useState(false);

  const handleTodayTaskAdded = () => {
    setRefreshTodayTasks((prevState) => !prevState);
  };

  const handleUpcomingTaskAdded = () => {
    setRefreshUpcomingTasks((prevState) => !prevState);
  };

  const handleProjectkAdded = () => {
    setRefreshProject((prevState) => !prevState);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <>
            <DashboardHeader />
            <HeaderList />
          </>
        );
      case "settings":
        return (
          <>
            <SettingsHeader />
            <Settings />
          </>
        );
      case "today-tasks":
        return (
          <>
            <TodayTaskHeader />
            <TodayTaskList
              key={refreshTodayTasks}
              onTaskComplete={handleTodayTaskAdded}
            />
            <AddTodayTaskCard onTaskAdded={handleTodayTaskAdded} />
          </>
        );
      case "upcoming-tasks":
        return (
          <>
            <UpcomingTaskHeader />
            <UpcomingTaskList
              key={refreshUpcomingTasks}
              onTaskComplete={handleUpcomingTaskAdded}
            />
            <AddUpcomingTaskCard onTaskAdded={handleUpcomingTaskAdded} />
          </>
        );
      case "projects":
        return (
          <>
            <ProjectsHeader />
            <ProjectsTaskList
              key={refreshProject}
              onTaskComplete={handleProjectkAdded}
            />
            <AddProjectsTaskCard onProjectAdded={handleProjectkAdded} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setActiveMenu={setActiveMenu} />
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
