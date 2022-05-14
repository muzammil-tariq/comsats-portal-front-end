import axios from "axios";
import {
  batchError,
  batchStart,
  batchSuccess,
  facultyError,
  facultyOneError,
  facultyOneStart,
  facultyOneSuccess,
  facultyStart,
  facultySuccess,
  registerFacultyError,
  registerFacultyStart,
  registerFacultySuccess,
} from "./facultySlice";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

// Asynchronous thunk action
export function getAllFaculty() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(facultyStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/faculty`);
      // console.log(data);
      // return;
      const { faculty } = data;
      dispatch(facultySuccess(faculty));
    } catch (error) {
      console.log(error);
      dispatch(facultyError());
    }
  };
}
// get one facculty
export function getOneFaculty(id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(facultyOneStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/faculty/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // return;
      console.log(data);

      const { faculty } = data;
      dispatch(facultyOneSuccess(faculty));
    } catch (error) {
      console.log(error);
      dispatch(facultyOneError());
    }
  };
}
// http://127.0.0.1:8000/api/auth/faculty/signup
// Asynchronous thunk action
export function registerFaculty(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(registerFacultyStart());
    try {
      const { data }: any = await axios.post(`${API_URL}/auth/faculty/signup`, {
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        password: obj.password,
      });
      // console.log(data);
      // return;
      const { faculty } = data;
      dispatch(registerFacultySuccess());
    } catch (error) {
      console.log(error);
      dispatch(registerFacultyError());
    }
  };
}

// Asynchronous thunk action
export function registerFacultyBatch(file: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(batchStart());
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data }: any = await axios.post(`${API_URL}/auth/faculty/signup/batch`, formData);
      // console.log(data);
      // return;
      const { message } = data;
      dispatch(batchSuccess(message));
    } catch (error) {
      console.log(error);
      dispatch(batchError());
    }
  };
}
