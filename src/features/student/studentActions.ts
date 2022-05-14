import axios from "axios";
import {
  batchError,
  batchStart,
  batchSuccess,
  registerStudentError,
  registerStudentStart,
  registerStudentSuccess,
  studentOneError,
  studentOneStart,
  studentOneSuccess,
  studentsError,
  studentsStart,
  studentsSuccess,
} from "./studentSlice";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

// Asynchronous thunk action
export function getAllStudents() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(studentsStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/students`);
      // console.log(data);
      // return;
      const { students } = data;
      dispatch(studentsSuccess(students));
    } catch (error) {
      console.log(error);
      dispatch(studentsError());
    }
  };
}
// Asynchronous thunk action
export function getOneStudent(id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(studentOneStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      const { student } = data;
      dispatch(studentOneSuccess(student));
      return student;
    } catch (error) {
      console.log(error);
      dispatch(studentOneError());
    }
  };
}

// Asynchronous thunk action
export function registerStudent(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(registerStudentStart());
    try {
      const { data }: any = await axios.post(`${API_URL}/auth/student/signup`, obj);
      // console.log(data);
      // return;
      // const { message } = data;
      dispatch(registerStudentSuccess());
    } catch (error) {
      console.log(error);
      dispatch(registerStudentError());
    }
  };
}

// Asynchronous thunk action
export function registerBatch(file: any, batch: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(batchStart());
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("batch", batch);
      const { data }: any = await axios.post(`${API_URL}/auth/student/signup/batch`, formData);
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
