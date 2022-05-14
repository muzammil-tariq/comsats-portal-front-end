import axios from "axios";
import {
  applyProjectError,
  applyProjectStart,
  applyProjectSuccess,
  createProjectError,
  createProjectStart,
  createProjectSuccess,
  projectsError,
  projectsStart,
  projectsSuccess,
  projectError,
  projectStart,
  projectSuccess,
} from "./projectSlice";
import { IProject } from "./projectTypes";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

// http://localhost:8000/api/project
// Asynchronous thunk action
// getting all projects
export function getAllProjects() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(projectsStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/project`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      const { projects } = data;
      // console.log(data);

      dispatch(projectsSuccess(projects));
    } catch (error) {
      console.log(error);
      dispatch(projectsError());
    }
  };
}
// Asynchronous thunk action
// create a project
export function createProject(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(createProjectStart());
    try {
      const { data }: any = await axios.post(
        `${API_URL}/project`,
        {
          title: obj.title,
          description: obj.description,
          methodology: obj.methodology,
          toolsandtechnology: obj.toolsandtechnology,
          outcome: obj.outcome,
          status: "available",
          user: "student",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data);
      // return;
      // const { project } = data;
      dispatch(createProjectSuccess());
    } catch (error) {
      console.log(error);
      dispatch(createProjectError());
    }
  };
}
// Asynchronous thunk action
// apply for a project
export function joinRequestGroup(id: string, studentId: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(applyProjectStart());
    try {
      const { data }: any = await axios.patch(
        `${API_URL}/group/sendRequest/${id}`,
        {
          studentId: studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      // return;
      // const { project } = data;
      dispatch(applyProjectSuccess());
    } catch (error) {
      console.log(error);
      dispatch(applyProjectError());
    }
  };
}
