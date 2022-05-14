// import { profile } from "console";
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
import Facultyform from "src/modules/Dialog/facultyform";
import Popup from "src/modules/Dialog/popup";

export default function ProfileDetailsfaculty() {
  const [profileData, setProfileData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setcontact] = useState("");

  /////////////////////GETTING USER PROFILE DATA////////////////////////

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    const facultyId = localStorage.getItem("facultyId");
    console.log("the incoing token value is", token);
    console.log("the incoing facylty Id  value is", facultyId);
    const api = `http://127.0.0.1:8000/api/faculty/${facultyId}`;

    await axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setFirstName(res.data.faculty.firstName);
        setLastName(res.data.faculty.lastName);
        setcontact(res.data.faculty.contact);
        setEmail(res.data.faculty.email);

        console.log("the incoming profile data is", res.data.faculty);
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
  const restartform = () => {
    // window.location.href = "http://localhost:3000/profile";
    alert("updated successfully");
  };
  return (
    <Card sx={{ width: "200%", maxWidth: 600, margin: 2 }}>
      <CardContent>
        <List sx={{ width: "200%", maxWidth: 600 }}>
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
              primary={<Typography variant="h6">First name:</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "flex" }}
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
              primary={<Typography variant="h6">Last name:</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                    color="text.primary"
                  >
                    {lastName}
                  </Typography>
                </React.Fragment>
              }
            />{" "}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={<Typography variant="h6">Email:</Typography>}
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
              primary={<Typography variant="h6">Phone no:</Typography>}
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
          </ListItem>
          <Divider />
        </List>
        <div
          style={{
            alignContent: "left",
            justifyContent: "left",
            alignItems: "right",
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
            <Facultyform />
          </CustomDialog>
          {/* </Popup> */}
        </div>
      </CardContent>
    </Card>
  );
}
