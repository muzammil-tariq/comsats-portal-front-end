import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IGroups } from "./groupTypes";

export interface IGroupSate {
  isProcessingRequest: boolean;
  gettingGroups?: boolean;
  groupsFailed?: boolean;
  groupsSuccessful?: boolean;
  groups?: IGroups[];
  // my group
  gettingGroup?: boolean;
  groupFailed?: boolean;
  groupSuccessful?: boolean;
  group?: IGroups;
  // create group
  creatingGroup?: boolean;
  groupCreateFailed?: boolean;
  groupCreateSuccessful?: boolean;
}

const initialState: IGroupSate = {
  isProcessingRequest: false,
  gettingGroups: false,
  groupsFailed: false,
  groupsSuccessful: false,
  groups: [],
  gettingGroup: false,
  groupFailed: false,
  groupSuccessful: false,
  group: undefined,
  // create group
  creatingGroup: false,
  groupCreateFailed: false,
  groupCreateSuccessful: false,
};
export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    groupStart: (state) => {
      return {
        ...state,
        gettingGroups: true,
      };
    },
    groupSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingGroups: false,
        groupsSuccessful: true,
        groups: payload,
      };
    },
    groupError: (state) => {
      return {
        ...state,
        gettingGroups: false,
        groupsFailed: true,
      };
    },
    // my group
    mygroupStart: (state) => {
      return {
        ...state,
        gettingGroup: true,
      };
    },
    mygroupSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingGroup: false,
        groupSuccessful: true,
        group: payload,
      };
    },
    mygroupError: (state) => {
      return {
        ...state,
        gettingGroup: false,
        groupFailed: true,
      };
    },
    // create group
    createGroupStart: (state) => {
      return {
        ...state,
        creatingGroup: true,
      };
    },
    createGroupSuccess: (state) => {
      return {
        ...state,
        creatingGroup: false,
        groupCreateSuccessful: true,
      };
    },
    createGroupError: (state) => {
      return {
        ...state,
        creatingGroup: false,
        groupCreateFailed: true,
      };
    },
  },
});
// student actions
export const {
  groupStart,
  groupSuccess,
  groupError,
  mygroupStart,
  mygroupSuccess,
  mygroupError,
  createGroupStart,
  createGroupSuccess,
  createGroupError,
} = groupSlice.actions;
// student state
export const groupSelector = (state: RootState) => state.group;
// student reducer
export const groupReducer = groupSlice.reducer;
