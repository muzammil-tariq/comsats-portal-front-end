import axios from "axios";
import {
  createTemplateError,
  createTemplateStart,
  createTemplateSuccess,
  deleteTemplateError,
  deleteTemplateStart,
  deleteTemplateSuccess,
  templateError,
  templateStart,
  templateSuccess,
  updateTemplateError,
  updateTemplateStart,
  updateTemplateSuccess,
} from "./templateSlice";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

// http://localhost:8000/api/template/all
// Asynchronous thunk action
// getting all templates
export function getAllTemplates() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(templateStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/template/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      const { templates } = data;
      console.log(data);

      dispatch(templateSuccess(templates));
    } catch (error) {
      console.log("error", error);
      dispatch(templateError());
    }
  };
}
// Asynchronous thunk action
// create a template
export function createNewTemplate(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(createTemplateStart());
    try {
      // send form data to the backend
      const formData = new FormData();
      formData.append("file", obj.file);
      formData.append("deliverable", obj.deliverable);
      formData.append("title", obj.title);
      const { data }: any = await axios.post(`${API_URL}/template`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const { template } = data;
      dispatch(createTemplateSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(createTemplateError());
    }
  };
}
// Asynchronous thunk action
// update a template
export function updateTemplate(obj: any, id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(updateTemplateStart());
    try {
      // send form data to the backend
      // const formData = new FormData();
      // formData.append("file", obj.file);
      // formData.append("deliverable", obj.deliverable);
      // formData.append("title", obj.title);
      const { data }: any = await axios.patch(`${API_URL}/template/${id}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const { template } = data;
      dispatch(updateTemplateSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(updateTemplateError());
    }
  };
}
// Asynchronous thunk action
// delete a template
export function deleteTemplate(id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(deleteTemplateStart());
    try {
      const { data }: any = await axios.delete(`${API_URL}/template/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const { template } = data;
      dispatch(deleteTemplateSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(deleteTemplateError());
    }
  };
}
