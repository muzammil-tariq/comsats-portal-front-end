import axios from "axios";
import {
  groupStart,
  groupSuccess,
  groupError,
  createGroupStart,
  createGroupSuccess,
  createGroupError,
  mygroupSuccess,
  mygroupError,
  mygroupStart,
} from "./groupSlice";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

//create a Group
export function createGroup(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(createGroupStart());
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data }: any = await axios.post(
        `${API_URL}/group`,
        {
          title: obj.GroupTitle,
          user: "student",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(createGroupSuccess());
    } catch (error) {
      console.log(error);
      dispatch(createGroupError());
    }
  };
}

//getting all Groups
export function getAllGroups() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(groupStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/group`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      const { groups } = data;
      // console.log(data);

      dispatch(groupSuccess(groups));
    } catch (error) {
      console.log(error);
      dispatch(groupError());
    }
  };
}
//getting my Group student.group
export function getMyGroup(id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(mygroupStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/group/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // return;
      const { group } = data;
      // console.log(data);

      dispatch(mygroupSuccess(group));
      return group;
    } catch (error) {
      console.log(error);
      dispatch(mygroupError());
    }
  };
}
