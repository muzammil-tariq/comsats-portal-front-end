import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  TextField,
  Tooltip,
  Zoom,
} from "@mui/material";
import { CustomInput } from "../base/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { groupSelector } from "src/features/groups/groupSlice";
import { createGroup } from "src/features/groups/groupActions";

interface State {
  GroupTitle: string;
}

const AddNewLog = () => {
  // useDispatch in case of calling an API
  const dispatch = useDispatch();

  // useSelector to get any state in the store
  const { groupsSuccessful, groupsFailed, groups, groupCreateFailed, groupCreateSuccessful } =
    useSelector(groupSelector);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const [values, setValues] = React.useState({
    GroupTitle: "",
  });

  const [errors, setErrors] = React.useState<State>({
    GroupTitle: "",
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

  const createNewGroup = async () => {
    // try {
    //   // pass the function in dispatch
    //   console.log(values);
    //   await dispatch(createGroup(values));
    //   console.log("Success", groupCreateSuccessful); ///this displays false for now hence the error.
    //   alert("Group Made Successfully..!");
    // } catch (er) {
    //   console.log("fail g", groupCreateFailed);
    // }
    alert("New Log Added. It will be added after Supervisor's Approval.");
    handleClose();
  };

  return (
    <div>
      <Tooltip TransitionComponent={Zoom} title="Create new log for your meeting.">
        <Button
          variant="contained"
          size="medium"
          onClick={handleClickOpen}
          startIcon={<AddCircleOutlineIcon />}
        >
          Create New Log
        </Button>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Enter Log Details.</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div>
              {/* <CustomInput
                value={values.GroupTitle}
                handleChange={handleChange("GroupTitle")}
                field="Title"
                type="name"
                error={errors.GroupTitle}
                helperText={"e.g. cool Group Name"}
              />{" "} */}
              <TextField
                id="logName"
                label="LogName"
                placeholder="e.g. Front end meet 2.0"
                multiline
                fullWidth
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                id="logDetails"
                label="Details."
                placeholder="e.g.Today professor and we had a meeting on front end of our application......."
                multiline
                fullWidth
                variant="outlined"
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              createNewGroup();
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewLog;
