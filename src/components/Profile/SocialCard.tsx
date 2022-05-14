import * as React from "react";
import { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Card, CardContent, IconButton, ListItemIcon } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { CustomButton } from "src/components/base/CustomButton";
import { CustomDialog } from "src/components/base/CustomDialogForm";
import SocialForm from "src/modules/Dialog/SocialForm";

export default function SocialCard() {
  const [profileData, setProfileData] = useState([]);
  const [hithub, setGitHub] = useState("");
  const [linkedIn, setlinkedIn] = useState("");
  const [website, setwebsite] = useState("");
  const [twitter, settwitter] = useState("");

  /////////////////////GETTING USER PROFILE DATA////////////////////////
  const [openPopup, setOpenPopup] = useState(false);
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
        setGitHub(res.data.student.github);
        setlinkedIn(res.data.student.linkedIn);
        setwebsite(res.data.student.website);
        settwitter(res.data.student.twitter);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  //---------------------------------------------------------------------

  const updateData = async () => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");
    console.log("the incoing token value is", token);
    console.log("the incoing student Id  value is", studentId);
    const api = `http://127.0.0.1:8000/api/students/${studentId}`;

    const userData = {
      github: hithub,
      linkedIn: linkedIn,
      website: website,
      twitter: twitter,
    };

    await axios
      .patch(api, { headers: { Authorization: `Bearer ${token}` }, userData })
      .then((res) => {
        setProfileData(res.data.student);
        setGitHub(res.data.student.github);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  // useEffect HookE
  useEffect(() => {
    getUserData();
  }, []);

  const handleClick = () => {
    setOpenPopup(true);
  };
  const dialogeClose = (value?: string) => {
    setOpenPopup(false);
  };
  const restartform = () => {
    window.location.href = "http://localhost:3000/profile";
    alert("updated successfully");
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 330, margin: 1 }}>
      <CardContent>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <ListItem alignItems="flex-start">
            <IconButton aria-label="web" size="medium">
              <ListItemIcon>
                <LanguageIcon fontSize="large" />{" "}
              </ListItemIcon>
            </IconButton>
            <ListItemText
              primary="Student Website"
              secondary={
                <React.Fragment>
                  <Typography
                    //  sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {website}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <IconButton aria-label="github" size="medium">
              <ListItemIcon>
                <GitHubIcon fontSize="large" />{" "}
              </ListItemIcon>
            </IconButton>
            <ListItemText
              primary="Github Student"
              secondary={
                <React.Fragment>
                  <Typography
                    //  sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {hithub}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <IconButton aria-label="linkedin" size="medium">
              <ListItemIcon>
                <LinkedInIcon fontSize="large" />{" "}
              </ListItemIcon>
            </IconButton>

            <ListItemText
              primary="Student LinkedIn"
              secondary={
                <React.Fragment>
                  <Typography
                    //  sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {linkedIn}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <IconButton aria-label="twitter" size="medium">
              <ListItemIcon>
                <TwitterIcon fontSize="large" />{" "}
              </ListItemIcon>
            </IconButton>

            <ListItemText
              primary="Student Twitter"
              secondary={
                <React.Fragment>
                  <Typography
                    //  sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {twitter}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        <div
          style={{
            marginLeft: "170px",
          }}
        >
          <CustomButton loading={false} handleClick={handleClick} text={"Update"} />
          <CustomDialog
            title="Update Social"
            open={openPopup}
            selectedValue={""}
            onClose={dialogeClose}
            closeText={"Close"}
            // onDone={restartform}
            // doneText="Confirm"
          >
            {/* <Popup title="Update Social" openPopup={openPopup} setOpenPopup={setOpenPopup}> */}
            <SocialForm />
          </CustomDialog>
          {/* </Popup> */}
        </div>
      </CardContent>
    </Card>
  );
}
