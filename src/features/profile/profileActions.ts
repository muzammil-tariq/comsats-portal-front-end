import axios from "axios";
import { studentProfileError, studentProfileStart, studentProfileSuccess } from "./profileSlice";

const API_URL = "http://localhost:8000/api";

// Asynchronous thunk action
export function getStudentProfile(id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(studentProfileStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/students/${id}`);
      // console.log(data);
      // return;
      const { student } = data;
      dispatch(studentProfileSuccess(student));
    } catch (error) {
      console.log(error);
      dispatch(studentProfileError());
    }
  };
}
