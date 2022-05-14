import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IStudent } from "./profileTypes";

export interface IProfileState {
  // isProcessingRequest: boolean;
  // gettingStudents?: boolean;
  // studentsFailed?: boolean;
  // studentsSuccessful?: boolean;
  // // batch
  // gettingBatch?: boolean;
  // batchFailed?: boolean;
  // batchSuccessful?: boolean;
  // students?: IStudent[];
  // batchMessage?: string;
  gettingStudentProfile: boolean;
  studentProfileFail: boolean;
  studentProfileSuccess: boolean;
  studentProfile?: IStudent;
}
const initialState: IProfileState = {
  // isProcessingRequest: false,
  gettingStudentProfile: false,
  studentProfileFail: false,
  studentProfileSuccess: false,
  studentProfile: undefined,
  // gettingBatch: false,
  // batchFailed: false,
  // batchSuccessful: false,
  // students: [],
  // batchMessage: "",
};
// name
// reducer
// actions
// caseReducers
export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    studentProfileStart: (state) => {
      return {
        ...state,
        gettingStudentProfile: true,
      };
    },
    studentProfileSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingStudentProfile: false,
        studentProfileSuccess: true,
        studentProfile: payload,
      };
    },
    studentProfileError: (state) => {
      return {
        ...state,
        gettingStudentProfile: false,
        studentProfileFail: true,
      };
    },
  },
});
// student actions
export const { studentProfileStart, studentProfileSuccess, studentProfileError } =
  ProfileSlice.actions;
// student state
export const ProfileSelector = (state: RootState) => state.profile;
// student reducer
export const profileReducer = ProfileSlice.reducer;
