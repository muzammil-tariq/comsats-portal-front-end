import * as React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CustomInput } from "../base/CustomInput";

interface State {
  ProjectTition: string;
  ProjectMethodolole: string;
  ProjectDescriptgy: string;
  ProjectToolsandTechnology: string;
  ProjectOutcome: string;
}
export default function StudentProjectFrom() {
  const [values, setValues] = React.useState({
    ProjectTitle: "",
    ProjectDescription: "",
    ProjectMethodology: "",
    ProjectToolsandTechnology: "",
    ProjectOutcome: "",
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

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

  return (
    <Box sx={{ width: "50%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* <Button onClick={handleClickOpen}>Open Form</Button> */}

        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Enter the Project Details.</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div style={{ marginBlockEnd: "2rem" }}>
                <CustomInput
                  value={values.ProjectTitle}
                  handleChange={"changed"}
                  field="Title"
                  type="name"
                  helperText={"e.g. cool project title"}
                />
                <CustomInput
                  value={values.ProjectDescription}
                  handleChange={"changed"}
                  field="Description"
                  type="name"
                  helperText={"e.g. Breif details about your project. (3-5 lines)"}
                />
                <CustomInput
                  value={values.ProjectMethodology}
                  handleChange={"changed"}
                  field="Methodoloy"
                  type="name"
                  helperText={"e.g. first you will do LMS then do the machine learning part......."}
                />
                <CustomInput
                  value={values.ProjectToolsandTechnology}
                  handleChange={"changed"}
                  field="Tools and Technologies"
                  type="name"
                  helperText={"e.g. MERN, Machine Learning, React Native, DevOps"}
                />
                <CustomInput
                  value={values.ProjectOutcome}
                  handleChange={"changed"}
                  field="Outcome."
                  type="name"
                  helperText={"e.g. A fully working web and Mobile application"}
                />{" "}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Apply</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
