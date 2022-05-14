import React from "react";
import { Router } from "react-router-dom";
import StudentProjectForm from "./components/studentProjects/StudentProjectForm";
// import NewAuthContainer from "./containers/NewAuthContainer";
import NewAuthContainer from "./containers/NAuthContainer";
import ProjectListContainer from "./containers/ProjectListContainer";
import StudentGroupContainer from "./containers/StudentGroupContainer";
import GroupFormed from "./pages/GroupFormed";
import Routes from "./routes";
import history from "./sevices/history";
import { CustomMuiTheme } from "./theme/CustomMuiTheme";

type Props = {};

export function App({}: Props): React.ReactElement {
  console.log("App Rendered!");
  return (
    <CustomMuiTheme>
      <Router history={history}>
        <Routes />
      </Router>
    </CustomMuiTheme>
  );
}
