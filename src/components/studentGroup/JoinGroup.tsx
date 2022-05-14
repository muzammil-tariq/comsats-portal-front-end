import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Tooltip,
  Zoom,
} from "@mui/material";
import { CustomInput } from "../base/CustomInput";

interface State {
  GroupId: string;
}

const JoinGroup = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const [values, setValues] = React.useState({
    GroupId: "",
  });

  const [errors, setErrors] = React.useState<State>({
    GroupId: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Tooltip TransitionComponent={Zoom} title="Join a group using group Id or Link.">
        <Button variant="outlined" size="medium" onClick={handleClickOpen} startIcon={<LinkIcon />}>
          Join Group
        </Button>
      </Tooltip>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Enter the Group Id / Link.</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div style={{ marginBlockEnd: "1rem" }}>
              <CustomInput
                value={values.GroupId}
                handleChange={handleChange("GroupId")}
                field="Group id/Link"
                type="name"
                error={errors.GroupId}
                helperText={"e.g. takmeelGroupLTD"}
              />{" "}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              alert("Join Request Sent Successfully..!");
            }}
          >
            Send Request.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JoinGroup;
