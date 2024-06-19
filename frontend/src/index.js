import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  TodayTaskProvider,
  UpcomingTaskProvider,
} from "../src/components/addons/taskContext";
import { ProjectProvider } from "./components/addons/projectContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TodayTaskProvider>
      <UpcomingTaskProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </UpcomingTaskProvider>
    </TodayTaskProvider>
  </React.StrictMode>
);
