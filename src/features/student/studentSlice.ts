import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IStudent } from "./studentTypes";

export interface IStudentState {
  isProcessingRequest: boolean;
  gettingStudents?: boolean;
  studentsFailed?: boolean;
  studentsSuccessful?: boolean;
  // get one student
  gettingOneStudent?: boolean;
  studentOneFailed?: boolean;
  studentOneSuccessful?: boolean;
  student?: IStudent;
  // register student
  registeringStudent: boolean;
  registerStudentFailed?: boolean;
  registerStudentSuccess?: boolean;
  // batch
  gettingBatch?: boolean;
  batchFailed?: boolean;
  batchSuccessful?: boolean;
  students?: IStudent[];
  batchMessage?: string;
}
const initialState: IStudentState = {
  isProcessingRequest: false,
  gettingStudents: false,
  studentsFailed: false,
  studentsSuccessful: false,
  gettingBatch: false,
  batchFailed: false,
  batchSuccessful: false,
  registeringStudent: false,
  registerStudentFailed: false,
  registerStudentSuccess: false,
  students: [],
  batchMessage: "",
  // get one
  gettingOneStudent: false,
  studentOneFailed: false,
  studentOneSuccessful: false,
  student: undefined,
};
// name
// reducer
// actions
// caseReducers
export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    studentsStart: (state) => {
      return {
        ...state,
        gettingStudents: true,
      };
    },
    studentsSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingStudents: false,
        studentsSuccessful: true,
        students: payload,
      };
    },
    studentsError: (state) => {
      return {
        ...state,
        gettingStudents: false,
        studentsFailed: true,
      };
    },
    // get one student
    studentOneStart: (state) => {
      return {
        ...state,
        gettingOneStudent: true,
      };
    },
    studentOneSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingOneStudent: false,
        studentOneSuccessful: true,
        student: payload,
      };
    },
    studentOneError: (state) => {
      return {
        ...state,
        gettingOneStudent: false,
        studentOneFailed: true,
      };
    },
    // register student
    registerStudentStart: (state) => {
      return {
        ...state,
        registeringStudent: true,
      };
    },
    registerStudentSuccess: (state) => {
      return {
        ...state,
        registeringStudent: false,
        registerStudentSuccess: true,
      };
    },
    registerStudentError: (state) => {
      return {
        ...state,
        registeringStudent: false,
        registerStudentFailed: true,
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
  studentsStart,
  studentsSuccess,
  studentsError,
  studentOneStart,
  studentOneSuccess,
  studentOneError,
  batchStart,
  batchSuccess,
  batchError,
  // student register
  registerStudentStart,
  registerStudentSuccess,
  registerStudentError,
} = studentSlice.actions;
// student state
export const studentSelector = (state: RootState) => state.students;
// student reducer
export const studentReducer = studentSlice.reducer;
