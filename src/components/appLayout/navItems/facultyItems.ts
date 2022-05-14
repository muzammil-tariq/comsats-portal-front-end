// import { AuthRoute } from "src/modules/auth/auth.routes";
// import AssessmentIcon from "@mui/icons-material/Assessment";
import { PersonAdd, PersonPinCircle } from "@material-ui/icons";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Report";
import ComplaintList from "src/components/Complain/ComplaintList";
import AuthContainer from "src/containers/AuthContainer";
import GroupContainer from "src/containers/ComplaintContainer";
import { DeliverablesContainer } from "src/containers/DeliverablesContainer";
import ProfileContainerFaculty from "src/containers/ProfileContainerFaculty";
import ProjectList from "src/containers/ProjectListContainer";
import { Home } from "src/pages/Home";

export const facultyItems = [
  {
    title: "Home",
    path: "/home",
    private: true,
    icon: HomeIcon,
    component: Home,
    subRoutes: [],
    //   { icon: InfoIcon, component: HomePage1, path: "/page1", title: "Home Page 1" },
    //   { icon: NewReleasesIcon, component: HomePage2, path: "/page2", title: "Home Page 2" },
    // ],
  },
  {
    title: "Profile",
    path: "/faculty-profile",
    private: true,
    icon: PersonPinCircle,
    component: ProfileContainerFaculty,
    subRoutes: [],
    //   { icon: InfoIcon, component: HomePage1, path: "/page1", title: "Home Page 1" },
    //   { icon: NewReleasesIcon, component: HomePage2, path: "/page2", title: "Home Page 2" },
    // ],
  },

  {
    title: "Project Group",
    path: "/project-group",
    private: true,
    icon: GroupIcon,
    component: Home,
    subRoutes: [],
  },
  {
    title: "Projects",
    path: "/projects",
    private: true,
    icon: FolderSharedIcon,
    component: ProjectList,
    subRoutes: [],
  },
  {
    title: "Deliverables",
    path: "/deliverables/faculty",
    private: true,
    icon: DescriptionIcon,
    component: DeliverablesContainer,
    subRoutes: [],
  },
  {
    title: "Templates",
    path: "/templates",
    private: true,
    icon: DescriptionIcon,
    component: Home,
    subRoutes: [],
  },
  {
    title: "Students",
    path: "/students",
    private: true,
    icon: DescriptionIcon,
    component: Home,
    subRoutes: [],
  },
  {
    title: "Complaints",
    path: "/complaint/managecomplaints",
    private: true,
    icon: ReportIcon,
    component: GroupContainer,
    subRoutes: [],
  },
];
