import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { deliverableReducer } from "src/features/deliverable/deliverableSlice";
import { facultyReducer } from "src/features/faculty/facultySlice";
import { groupReducer } from "src/features/groups/groupSlice";
import { profileReducer } from "src/features/profile/profileSlice";
import { projectReducer } from "src/features/projects/projectSlice";
import { studentReducer } from "src/features/student/studentSlice";
import { templateReducer } from "src/features/template/templateSlice";
import { authReducer } from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
import { settingsSlice } from "../features/settings/settingsSlice";

/**
 * @link https://redux-toolkit.js.org/tutorials/typescript Redux-Toolkit Typescript Docs
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    settings: settingsSlice.reducer,
    auth: authReducer,
    students: studentReducer,
    faculty: facultyReducer,
    project: projectReducer,
    profile: profileReducer,
    group: groupReducer,
    deliverable: deliverableReducer,
    template: templateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
