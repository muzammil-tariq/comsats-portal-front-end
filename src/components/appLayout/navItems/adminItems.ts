import { PersonPinCircle } from "@material-ui/icons";
// import AssessmentIcon from "@mui/icons-material/Assessment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Report";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { AddFaculty } from "src/components/admin/addFaculty/AddFaculty";
import { ManageFaculty } from "src/components/admin/ManageFaculty";
import { ManageStudents } from "src/components/admin/ManageStudents";
import AdminCard from "src/components/adminprofile";
import ComplaintListAdmin from "src/components/Complain/complaintAdmin";
import Fyp_time from "src/components/dashboard/Fyp_TimeManage";
import Submission from "src/components/dashboard/Project_submission";
import Scheduler from "src/components/scheduler/Admin_scheduler";
import AddFacultyContainer from "src/containers/AddFacultyContainer";
import AddStudentContainer from "src/containers/AddStudentContainer";
import { DeliverablesContainer } from "src/containers/DeliverablesContainer";
import DmcContainer from "src/containers/DmcContainer";
import ProfileContainer from "src/containers/ProfileContainer";
import ProjectList from "src/containers/ProjectListContainer";
import { TemplateContainer } from "src/containers/TemplateContainer";
import { Home } from "src/pages/Home";

export const adminItems = [
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
    path: "/admin-profile",
    private: true,
    icon: PersonPinCircle,
    component: AdminCard,
    subRoutes: [],
    //   { icon: InfoIcon, component: HomePage1, path: "/page1", title: "Home Page 1" },
    //   { icon: NewReleasesIcon, component: HomePage2, path: "/page2", title: "Home Page 2" },
    // ],
  },
  {
    title: "Students",
    path: "/manage/students",
    private: true,
    icon: GroupIcon,
    component: ManageStudents,
    subRoutes: [
      {
        icon: GroupIcon,
        component: AddStudentContainer,
        path: "/add-students",
        title: "Add Students",
      },
    ],
  },
  {
    title: "Faculty",
    path: "/manage/faculty",
    private: true,
    icon: GroupIcon,
    component: ManageFaculty,
    subRoutes: [
      {
        icon: GroupIcon,
        component: AddFacultyContainer,
        path: "/add-faculty",
        title: "Add Faculty",
      },
    ],
  },
  {
    title: "Deliverables",
    path: "/deliverables/admin",
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
    component: TemplateContainer,
    subRoutes: [],
  },
  {
    title: "Report Generator",
    path: "/report-dmc",
    private: true,
    icon: AssessmentIcon,
    component: DmcContainer,
    subRoutes: [],
  },
  // {
  //   title: "Projects",
  //   path: "/projects",
  //   private: true,
  //   icon: FolderSharedIcon,
  //   component: ProjectList,
  //   subRoutes: [],
  // },
  // {
  //   title: "Deliverables",
  //   path: "/deliverables",
  //   private: true,
  //   icon: AssessmentIcon,
  //   component: Home,
  //   subRoutes: [],
  // },
  // {
  //   title: "Templates",
  //   path: "/templates",
  //   private: true,
  //   icon: DescriptionIcon,
  //   component: Home,
  //   subRoutes: [],
  // },
  {
    title: "Complaints",
    path: "/complaint/admincomplaint",
    private: true,
    icon: ReportIcon,
    component: ComplaintListAdmin,
    subRoutes: [],
  },
  {
    title: "Scheduler",
    path: "/scheduler",
    icon: ScheduleIcon,
    private: true,
    component: Scheduler,
    subRoutes: [],
  },
];
