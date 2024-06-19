import React from "react";
import TodayTaskList from "./todayTaskList";
import UpcomingTaskList from "./upcomingTaskList";
import "../../styles.css";

const HeaderList = () => {
  return (
    <div className="header-list">
      <h2>List Tugas Hari Ini</h2>
      <TodayTaskList />
      <h2>List Tugas Yang Akan Datang</h2>
      <UpcomingTaskList />
    </div>
  );
};

export default HeaderList;
