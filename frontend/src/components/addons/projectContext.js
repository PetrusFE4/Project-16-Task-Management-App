import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectCount, setProjectCount] = useState(0);
  const [completedProjectCount, setCompletedProjectCount] = useState(0);

  const updateCompletedProjectCount = () => {
    setCompletedProjectCount((prevCount) => prevCount + 1);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectCount,
        completedProjectCount,
        updateCompletedProjectCount,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
