import * as React from "react";
import { DialogActions, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { CustomButton } from "./CustomButton";

interface DialogProps {
  title: string;
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  onDone?: (value: string) => void;
  children?: any;
  closeText: string;
  doneText?: string;
}

export const CustomDialog = (props: DialogProps) => {
  const { title, onClose, selectedValue, open, children, closeText, doneText, onDone } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ padding: "1rem" }}>{children}</DialogContent>
      <DialogActions>
        <CustomButton handleClick={handleClose} loading={false} text={closeText} />
        {doneText && <CustomButton handleClick={onDone} loading={false} text={doneText} />}
      </DialogActions>
    </Dialog>
  );
};
