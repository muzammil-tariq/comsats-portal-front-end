import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import AddNewLog from "src/components/meetingLogger/AddNewLog";
import LogsList from "src/components/meetingLogger/LogsList";
import ApproveLogs from "src/components/meetingLogger/ApproveLogs";

interface TabPanelProps {
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

export default function MeetingLoggerContainer() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "auto" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="Student Group"
        >
          <Tooltip title="Add new logs and View List of Recently Added Logs.">
            <Tab label="Add Logs" {...a11yProps(0)} />
          </Tooltip>
          <Tooltip title="View and Approve Logs written by students.">
            <Tab label="Approve Logs" {...a11yProps(1)} />
          </Tooltip>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <AddNewLog />
          <br />
          <LogsList />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <ApproveLogs />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
