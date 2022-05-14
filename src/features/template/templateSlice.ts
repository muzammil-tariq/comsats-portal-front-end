import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ITemplate } from "./templateTypes";

export interface ITemplateSate {
  isProcessingRequest: boolean;
  gettingTemplates?: boolean;
  templatesFailed?: boolean;
  templatesSuccessful?: boolean;
  templates?: ITemplate[];
  // create template
  creatingTemplate?: boolean;
  templateCreateFailed?: boolean;
  templateCreateSuccessful?: boolean;
  // update template
  updatingTemplate?: boolean;
  templateUpdateFailed?: boolean;
  templateUpdateSuccessful?: boolean;
  // delete template
  deletingTemplate?: boolean;
  templateDeleteFailed?: boolean;
  templateDeleteSuccessful?: boolean;
}
const initialState: ITemplateSate = {
  isProcessingRequest: false,
  gettingTemplates: false,
  templatesFailed: false,
  templatesSuccessful: false,
  templates: [],
  // create
  creatingTemplate: false,
  templateCreateFailed: false,
  templateCreateSuccessful: false,
  // update template
  updatingTemplate: false,
  templateUpdateFailed: false,
  templateUpdateSuccessful: false,
  // delete template
  deletingTemplate: false,
  templateDeleteFailed: false,
  templateDeleteSuccessful: false,
};
// name
// reducer
// actions
// caseReducers
export const templateSlice = createSlice({
  name: "Template",
  initialState,
  reducers: {
    templateStart: (state) => {
      return {
        ...state,
        gettingTemplates: true,
      };
    },
    templateSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingTemplates: false,
        templatesSuccessful: true,
        templates: payload,
      };
    },
    templateError: (state) => {
      return {
        ...state,
        gettingTemplates: false,
        templatesFailed: true,
      };
    },
    // create template
    createTemplateStart: (state) => {
      return {
        ...state,
        creatingTemplate: true,
      };
    },
    createTemplateSuccess: (state) => {
      return {
        ...state,
        creatingTemplate: false,
        templateCreateSuccessful: true,
      };
    },
    createTemplateError: (state) => {
      return {
        ...state,
        creatingTemplate: false,
        templateCreateFailed: true,
      };
    },
    // update template
    updateTemplateStart: (state) => {
      return {
        ...state,
        updatingTemplate: true,
      };
    },
    updateTemplateSuccess: (state) => {
      return {
        ...state,
        updatingTemplate: false,
        templateUpdateSuccessful: true,
      };
    },
    updateTemplateError: (state) => {
      return {
        ...state,
        updatingTemplate: false,
        templateUpdateFailed: true,
      };
    },
    // delete template
    deleteTemplateStart: (state) => {
      return {
        ...state,
        deletingTemplate: true,
      };
    },
    deleteTemplateSuccess: (state) => {
      return {
        ...state,
        deletingTemplate: false,
        templateDeleteSuccessful: true,
      };
    },
    deleteTemplateError: (state) => {
      return {
        ...state,
        deletingTemplate: false,
        templateDeleteFailed: true,
      };
    },
  },
});
// student actions
export const {
  templateStart,
  templateSuccess,
  templateError,
  createTemplateStart,
  createTemplateSuccess,
  createTemplateError,
  // update
  updateTemplateStart,
  updateTemplateSuccess,
  updateTemplateError,
  // delete
  deleteTemplateStart,
  deleteTemplateSuccess,
  deleteTemplateError,
} = templateSlice.actions;
// student state
export const templateSelector = (state: RootState) => state.template;
// student reducer
export const templateReducer = templateSlice.reducer;
