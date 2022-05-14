import * as React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PreviewIcon from "@mui/icons-material/Preview";
import { AppBar, Box, DialogContentText, Tab, Tabs, TextField, Tooltip } from "@mui/material";
import { CustomTypography } from "../base/CustomTypography";
import Rows from "./data copy.json";
import { CustomButton } from "../base/CustomButton";
import SwipeableViews from "react-swipeable-views";
import {
  DataGrid,
  GridApi,
  GridCell,
  GridCellParams,
  GridCellValue,
  GridColDef,
  GridRowId,
  GridValueGetterParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import { getValue } from "@testing-library/user-event/dist/utils";
import { id } from "date-fns/locale";

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function ProjectDetails() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const handleClickOpen = () => {
    // var ID = GridRowId;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

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
    <div>
      <Tooltip title="View Project Details">
        <IconButton onClick={handleClickOpen}>
          <PreviewIcon />
        </IconButton>
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
        <DialogTitle id="scroll-dialog-title">
          {" Project: FYP  PORTAL by Dr.Inayat-ur-Rehman"}
        </DialogTitle>
        <br />
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="Student Group"
          >
            <Tooltip title="  Description about the Project.">
              <Tab label="Description" {...a11yProps(0)} />
            </Tooltip>
            <Tooltip title="Software Methodology which will be used.">
              <Tab label="Methodology" {...a11yProps(1)} />
            </Tooltip>
            <Tooltip title="Which will be used in making and development of the Project.">
              <Tab label="Tools and Technologies" {...a11yProps(2)} />
            </Tooltip>
            <Tooltip title="What the Final Product would be.">
              <Tab label="Outcome" {...a11yProps(3)} />
            </Tooltip>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <CustomTypography
              text={"Web and mobile-based application to manage the Final year projects."}
              variant="body1"
              component={undefined}
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <CustomTypography text={"Devops Methodology"} variant="body1" component={undefined} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <CustomTypography text={"Docker"} variant="body1" component={undefined} />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <CustomTypography
              text={"A fully Deployed and improved FYP Portal"}
              variant="body1"
              component={undefined}
            />
          </TabPanel>
        </SwipeableViews>
        {/* <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div>
              <CustomTypography text={Rows.Log.details} variant="body1" component={undefined} />
            </div>
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <CustomButton text="Close" handleClick={handleClose} loading={false} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
