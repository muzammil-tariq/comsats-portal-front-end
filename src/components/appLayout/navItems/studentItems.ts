// import { AuthRoute } from "src/modules/auth/auth.routes";
import { PersonAdd, PersonPinCircle } from "@material-ui/icons";
// import DescriptionIcon from "@mui/icons-material/Description";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Report";
import Submission from "src/components/dashboard/Project_submission";
import GroupContainer from "src/containers/ComplaintContainer";
import { DeliverablesContainer } from "src/containers/DeliverablesContainer";
// import { DeliverablesContainerStudent } from "src/containers/DeliverablesContainerStudent";
// import EvaluatorContainer from "src/containers/EvaluatorContainer";
import MeetingLoggerContainer from "src/containers/MeetingLoggerContainer";
import ProfileContainer from "src/containers/ProfileContainer";
import ProjectList from "src/containers/ProjectListContainer";
import StudentGroupContainer from "src/containers/StudentGroupContainer";
// import { Deliverables } from "src/pages/Deliverables";

export const studentItems = [
  {
    title: "Home",
    path: "/home",
    private: true,
    icon: HomeIcon,
    component: Submission,
    subRoutes: [],
    //   { icon: InfoIcon, component: HomePage1, path: "/page1", title: "Home Page 1" },
    //   { icon: NewReleasesIcon, component: HomePage2, path: "/page2", title: "Home Page 2" },
    // ],
  },
  {
    title: "Profile",
    path: "/profile",
    private: true,
    icon: PersonPinCircle,
    component: ProfileContainer,
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
    component: StudentGroupContainer,
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
    path: "/deliverables/student",
    private: true,
    icon: FolderSharedIcon,
    component: DeliverablesContainer,
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
  {
    title: "Meeting-Logger",
    path: "/meeting-logger",
    private: true,
    icon: ForumIcon,
    component: MeetingLoggerContainer,
    subRoutes: [],
  },
];
