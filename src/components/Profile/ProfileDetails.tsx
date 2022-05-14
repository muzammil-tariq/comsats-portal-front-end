import { profile } from "console";
import * as React from "react";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { CustomButton } from "src/components/base/CustomButton";
import { CustomDialog } from "src/components/base/CustomDialogForm";
import EmployeeForm from "src/modules/Dialog/form";

export default function ProfileDetails() {
  const [profileData, setProfileData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegno] = useState("");
  const [contact, setContact] = useState("");
  const [hithub, setGitHub] = useState("");

  /////////////////////GETTING USER PROFILE DATA////////////////////////

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");
    console.log("the incoing token value is", token);
    console.log("the incoing student Id  value is", studentId);
    const api = `http://127.0.0.1:8000/api/students/${studentId}`;

    await axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setProfileData(res.data.student);
        setFirstName(res.data.student.firstName);
        setLastName(res.data.student.lastName);
        setRegno(res.data.student.regNo);
        setEmail(res.data.student.email);
        setContact(res.data.student.contact);
        setGitHub(res.data.student.github);
        console.log("the incoming profile data is", res.data.student);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  //---------------------------------------------------------------------

  // useEffect Hook
  useEffect(() => {
    getUserData();
  }, []);
  const [openPopup, setOpenPopup] = useState(false);
  const handleClick = () => {
    setOpenPopup(true);
  };
  const dialogeClose = (value?: string) => {
    setOpenPopup(false);
  };
  return (
    <Card sx={{ width: "150%", maxWidth: 500, margin: 5 }}>
      <CardContent>
        <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
          <ListItem>
            {" "}
            <Tooltip title="Edit Details.">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <ListItemText primary={<Typography variant="h6">Details</Typography>} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={<Typography variant="body2">Name:</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                    color="text.primary"
                  >
                    {firstName}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={<Typography variant="body2">Registration No.:</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                    color="text.primary"
                  >
                    {regNo}
                  </Typography>
                </React.Fragment>
              }
            />{" "}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={<Typography variant="body2">Email:</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                    color="text.primary"
                  >
                    {email}
                  </Typography>
                </React.Fragment>
              }
            />{" "}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={<Typography variant="body2">Phone no:</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                    color="text.primary"
                  >
                    {contact}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>{" "}
          <Divider />
        </List>
        <div
          style={{
            alignContent: "right",
            justifyContent: "right",
          }}
        >
          <CustomButton loading={false} handleClick={handleClick} text={"update"} />
          <CustomDialog
            title="Update Details"
            open={openPopup}
            selectedValue={""}
            onClose={dialogeClose}
            closeText={"Close"}
            // onDone={restartform}
            // doneText="Confirm"
          >
            {/* <Popup title="Update Details" openPopup={openPopup} setOpenPopup={setOpenPopup}> */}
            <EmployeeForm />
          </CustomDialog>
          {/* </Popup> */}
        </div>
      </CardContent>
    </Card>
  );
}
