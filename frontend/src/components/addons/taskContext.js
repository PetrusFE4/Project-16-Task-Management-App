import React, { createContext, useContext, useState } from "react";

const TodayTaskContext = createContext();
const UpcomingTaskContext = createContext();

export const TodayTaskProvider = ({ children }) => {
  const [todayTaskCount, setTodayTaskCount] = useState(0);
  const [todayCompletedTaskCount, setTodayCompletedTaskCount] = useState(0);

  const updateTodayCompletedTaskCount = () => {
    setTodayCompletedTaskCount((prevCount) => prevCount + 1);
  };

  return (
    <TodayTaskContext.Provider
      value={{
        todayTaskCount,
        todayCompletedTaskCount,
        updateTodayCompletedTaskCount,
      }}
    >
      {children}
    </TodayTaskContext.Provider>
  );
};

export const UpcomingTaskProvider = ({ children }) => {
  const [upcomingTaskCount, setUpcomingTaskCount] = useState(0);
  const [upcomingCompletedTaskCount, setUpcomingCompletedTaskCount] =
    useState(0);

  const updateUpcomingCompletedTaskCount = () => {
    setUpcomingCompletedTaskCount((prevCount) => prevCount + 1);
  };

  return (
    <UpcomingTaskContext.Provider
      value={{
        upcomingTaskCount,
        upcomingCompletedTaskCount,
        updateUpcomingCompletedTaskCount,
      }}
    >
      {children}
    </UpcomingTaskContext.Provider>
  );
};

export const useTodayTaskContext = () => useContext(TodayTaskContext);
export const useUpcomingTaskContext = () => useContext(UpcomingTaskContext);
