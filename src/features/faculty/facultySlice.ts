import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IFaculty } from "./facultyTypes";

export interface IFacultyState {
  isProcessingRequest: boolean;
  gettingFaculty?: boolean;
  facultyFailed?: boolean;
  facultySuccessful?: boolean;
  faculties?: IFaculty[];

  gettingOneFaculty?: boolean;
  facultyOneFailed?: boolean;
  facultyOneSuccessful?: boolean;
  faculty?: IFaculty;
  // add faculty
  registeringFaculty?: boolean;
  facultyRegisterFail?: boolean;
  facultyRegisterSuccess?: boolean;
  // batch
  gettingBatch?: boolean;
  batchFailed?: boolean;
  batchSuccessful?: boolean;
  batchMessage?: string;
}
const initialState: IFacultyState = {
  isProcessingRequest: false,
  gettingFaculty: false,
  facultyFailed: false,
  facultySuccessful: false,
  faculties: [],
  // one faculty
  gettingOneFaculty: false,
  facultyOneFailed: false,
  facultyOneSuccessful: false,
  faculty: undefined,

  registeringFaculty: false,
  facultyRegisterFail: false,
  facultyRegisterSuccess: false,
  gettingBatch: false,
  batchFailed: false,
  batchSuccessful: false,
  batchMessage: "",
};
// name
// reducer
// actions
// caseReducers
export const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    facultyStart: (state) => {
      return {
        ...state,
        gettingFaculty: true,
      };
    },
    facultySuccess: (state, { payload }) => {
      return {
        ...state,
        gettingFaculty: false,
        facultySuccessful: true,
        faculties: payload,
      };
    },
    facultyError: (state) => {
      return {
        ...state,
        gettingFaculty: false,
        facultyFailed: true,
      };
    },
    // getting one faculty
    facultyOneStart: (state) => {
      return {
        ...state,
        gettingOneFaculty: true,
      };
    },
    facultyOneSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingOneFaculty: false,
        facultyOneSuccessful: true,
        faculty: payload,
      };
    },
    facultyOneError: (state) => {
      return {
        ...state,
        gettingOneFaculty: false,
        facultyOneFailed: true,
      };
    },
    // register faculty
    registerFacultyStart: (state) => {
      return {
        ...state,
        registeringFaculty: true,
      };
    },
    registerFacultySuccess: (state) => {
      return {
        ...state,
        registeringFaculty: false,
        facultyRegisterSuccess: true,
      };
    },
    registerFacultyError: (state) => {
      return {
        ...state,
        registeringFaculty: false,
        facultyRegisterFail: true,
      };
    },
    // register batch
    batchStart: (state) => {
      return {
        ...state,
        gettingBatch: true,
      };
    },
    batchSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingBatch: false,
        batchSuccessful: true,
        batchMessage: payload,
      };
    },
    batchError: (state) => {
      return {
        ...state,
        gettingBatch: false,
        batchFailed: true,
      };
    },
  },
});
// student actions
export const {
  facultyStart,
  facultySuccess,
  facultyError,
  facultyOneStart,
  facultyOneSuccess,
  facultyOneError,
  registerFacultyStart,
  registerFacultySuccess,
  registerFacultyError,
  batchStart,
  batchSuccess,
  batchError,
} = facultySlice.actions;
// student state
export const facultySelector = (state: RootState) => state.faculty;
// student reducer
export const facultyReducer = facultySlice.reducer;
