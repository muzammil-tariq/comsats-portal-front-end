import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IAuth {
  isProcessingRequest: boolean;
  accessToken?: string;
  message?: string;
  loginSuccessful?: boolean;
  registerSuccessful?: boolean;
  currentUser?: any;
}
const initialState: IAuth = {
  isProcessingRequest: false,
  accessToken: "",
  currentUser: null,
  message: "",
  loginSuccessful: false,
  registerSuccessful: false,
};
// name
// reducer
// actions
// caseReducers
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state) => {
      return {
        ...state,
        isProcessingRequest: true,
      };
    },
    registerSuccess: (state) => {
      return {
        ...state,
        isProcessingRequest: false,
        registerSuccessful: true,
      };
    },
    registerError: (state, { payload }) => {
      return {
        ...state,
        isProcessingRequest: false,
        message: payload,
      };
    },
    loginStart: (state) => {
      return {
        ...state,
        isProcessingRequest: true,
      };
    },
    loginSuccess: (state, { payload }) => {
      return {
        ...state,
        isProcessingRequest: false,
        loginSuccessful: true,
        accessToken: payload.token,
        currentUser: payload.user,
      };
    },
    loginError: (state, { payload }) => {
      return {
        ...state,
        isProcessingRequest: false,
        message: payload,
      };
    },
    logout: (state) => {
      state.accessToken = undefined;
    },
  },
});
// auth actions
export const {
  registerStart,
  registerSuccess,
  registerError,
  loginStart,
  loginSuccess,
  loginError,
  logout,
} = authSlice.actions;
// auth state
export const authSelector = (state: RootState) => state.auth;
// auth reducer
export const authReducer = authSlice.reducer;
