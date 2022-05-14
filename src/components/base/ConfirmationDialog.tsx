import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

interface Props {
  title: string;
  open: boolean;
  children: any;
  handleSubmit?: any;
  handleClose: any;
  closeText?: string;
  doneText?: string;
}
export default function ConfirmationDialog(props: Props) {
  const { children, handleClose, open, handleSubmit, title, doneText, closeText } = props;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {closeText && <Button onClick={handleClose}>{closeText}</Button>}
          {doneText && <Button onClick={handleSubmit}>{doneText}</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
