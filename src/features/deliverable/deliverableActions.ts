import axios from "axios";
import {
  createDeliverableError,
  createDeliverableStart,
  createDeliverableSuccess,
  deleteDeliverableError,
  deleteDeliverableStart,
  deleteDeliverableSuccess,
  deliverableError,
  deliverableStart,
  deliverableSuccess,
  updateDeliverableError,
  updateDeliverableStart,
  updateDeliverableSuccess,
} from "./deliverableSlice";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

// http://localhost:8000/api/deliverable
// Asynchronous thunk action
// getting all Deliverables
export function getAllDeliverables() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(deliverableStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/deliverable`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      const { deliverables } = data;
      // console.log(data);

      dispatch(deliverableSuccess(deliverables));
    } catch (error) {
      console.log("error", error);
      dispatch(deliverableError());
    }
  };
}
// Asynchronous thunk action
// create a Deliverable
export function createDeliverable(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(createDeliverableStart());
    try {
      const { data }: any = await axios.post(`${API_URL}/deliverable`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      // const { Deliverable } = data;
      dispatch(createDeliverableSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(createDeliverableError());
    }
  };
}
// Asynchronous thunk action
// update a deliverable
export function updateDeliverable(obj: any, id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(updateDeliverableStart());
    try {
      // send form data to the backend
      // const formData = new FormData();
      // formData.append("file", obj.file);
      // formData.append("deliverable", obj.deliverable);
      // formData.append("title", obj.title);
      const { data }: any = await axios.patch(`${API_URL}/deliverable/${id}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const { deliverable } = data;
      dispatch(updateDeliverableSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(updateDeliverableError());
    }
  };
}
// Asynchronous thunk action
// delete a deliverable
export function deleteDeliverable(id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(deleteDeliverableStart());
    try {
      const { data }: any = await axios.delete(`${API_URL}/deliverable/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const { deliverable } = data;
      dispatch(deleteDeliverableSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(deleteDeliverableError());
    }
  };
}
