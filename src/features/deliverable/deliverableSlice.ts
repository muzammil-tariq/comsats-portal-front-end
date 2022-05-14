import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IDeliverable } from "./deliverableTypes";

export interface IDeliverableSate {
  isProcessingRequest: boolean;
  gettingDeliverables?: boolean;
  deliverablesFailed?: boolean;
  deliverablesSuccessful?: boolean;
  deliverables?: IDeliverable[];
  // create Deliverable
  creatingDeliverable?: boolean;
  deliverableCreateFailed?: boolean;
  deliverableCreateSuccessful?: boolean;
  // update Deliverable
  updatingDeliverable?: boolean;
  deliverableUpdateFailed?: boolean;
  deliverableUpdateSuccessful?: boolean;
  // delete Deliverable
  deletingDeliverable?: boolean;
  deliverableDeleteFailed?: boolean;
  deliverableDeleteSuccessful?: boolean;
}
const initialState: IDeliverableSate = {
  isProcessingRequest: false,
  gettingDeliverables: false,
  deliverablesFailed: false,
  deliverablesSuccessful: false,
  deliverables: [],
  // create Deliverable
  creatingDeliverable: false,
  deliverableCreateFailed: false,
  deliverableCreateSuccessful: false,
  // update Deliverable
  updatingDeliverable: false,
  deliverableUpdateFailed: false,
  deliverableUpdateSuccessful: false,
  // delete Deliverable
  deletingDeliverable: false,
  deliverableDeleteFailed: false,
  deliverableDeleteSuccessful: false,
};
// name
// reducer
// actions
// caseReducers
export const deliverableSlice = createSlice({
  name: "Deliverable",
  initialState,
  reducers: {
    deliverableStart: (state) => {
      return {
        ...state,
        gettingDeliverables: true,
      };
    },
    deliverableSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingDeliverables: false,
        deliverablesSuccessful: true,
        deliverables: payload,
      };
    },
    deliverableError: (state) => {
      return {
        ...state,
        gettingDeliverables: false,
        deliverablesFailed: true,
      };
    },
    // create Deliverable
    createDeliverableStart: (state) => {
      return {
        ...state,
        creatingDeliverable: true,
      };
    },
    createDeliverableSuccess: (state) => {
      return {
        ...state,
        creatingDeliverable: false,
        deliverableCreateSuccessful: true,
      };
    },
    createDeliverableError: (state) => {
      return {
        ...state,
        creatingDeliverable: false,
        deliverableCreateFailed: true,
      };
    },
    // update Deliverable
    updateDeliverableStart: (state) => {
      return {
        ...state,
        updatingDeliverable: true,
      };
    },
    updateDeliverableSuccess: (state) => {
      return {
        ...state,
        updatingDeliverable: false,
        deliverableDeleteSuccessful: true,
      };
    },
    updateDeliverableError: (state) => {
      return {
        ...state,
        updatingDeliverable: false,
        deliverableUpdateFailed: true,
      };
    },
    // delete Deliverable
    deleteDeliverableStart: (state) => {
      return {
        ...state,
        deletingDeliverable: true,
      };
    },
    deleteDeliverableSuccess: (state) => {
      return {
        ...state,
        deletingDeliverable: false,
        deliverableDeleteSuccessful: true,
      };
    },
    deleteDeliverableError: (state) => {
      return {
        ...state,
        deletingDeliverable: false,
        deliverableDeleteFailed: true,
      };
    },
  },
});
// student actions
export const {
  deliverableStart,
  deliverableSuccess,
  deliverableError,
  createDeliverableStart,
  createDeliverableSuccess,
  createDeliverableError,
  // update
  updateDeliverableStart,
  updateDeliverableSuccess,
  updateDeliverableError,
  // delete
  deleteDeliverableStart,
  deleteDeliverableSuccess,
  deleteDeliverableError,
} = deliverableSlice.actions;
// student state
export const deliverableSelector = (state: RootState) => state.deliverable;
// student reducer
export const deliverableReducer = deliverableSlice.reducer;
