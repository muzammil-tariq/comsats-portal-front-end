import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Password } from "@mui/icons-material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { TextField, IconButton } from "@mui/material";
import { color } from "@mui/system";
import axios from "axios";
import { CustomButton } from "src/components/base/CustomButton";

export default function SocialForm() {
  const [website, setWebsite] = useState("");
  const [linkedIn, setLinkedln] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGitHub] = useState("");

  const restartform = () => {
    window.location.href = "http://localhost:3000/profile";
    alert("upsdated successfully");
  };

  /////////////////////GETTING USER PROFILE DATA////////////////////////
  const getUserData = async () => {
    // const id = "61c75e46cb743d254c895812";
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");
    console.log("the incoing token value is", token);
    console.log("the incoing student Id  value is", studentId);
    const api = `http://127.0.0.1:8000/api/students/${studentId}`;

    await axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setWebsite(res.data.student.website);
        setLinkedln(res.data.student.linkedIn);
        setTwitter(res.data.student.twitter);
        setGitHub(res.data.student.github);
        console.log("the incoming profile data is", res.data.student);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  //---------------------------------------------------------------------

  /////////////////////UPDATING USER PROFILE DATA////////////////////////
  const updateUserData = async () => {
    // const Tid = "61c75e46cb743d254c895812";
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");
    console.log("the incoing token value is", token);
    console.log("the incoing student Id  value is", studentId);
    const api = `http://127.0.0.1:8000/api/students/${studentId}`;
    const data = {
      Website: website,
      linkedIn: linkedIn,
      github: github,
      twitter: twitter,
    };

    console.log("the updated value is set to", data);
    await axios
      .patch(api, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        alert("User Profile updated");
        console.log("the incoming response for update profile is", res.data);
        window.location.href = "http://localhost:3000/profile";
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

  return (
    <form>
      <Grid container>
        <Grid item xs={6} style={{ paddingBlock: "20px" }}>
          <TextField
            id="email"
            variant="outlined"
            value={website}
            name="website"
            label="website"
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="website"
          />
        </Grid>

        <Grid item xs={6} style={{ paddingBlock: "20px" }}>
          <TextField
            id="Phone"
            variant="outlined"
            name="linkedln"
            value={linkedIn}
            label="linkedln"
            onChange={(e) => setLinkedln(e.target.value)}
            placeholder="linkedln"
          />
        </Grid>

        <Grid item xs={6} style={{ paddingBlock: "20px" }}>
          <TextField
            id="email"
            variant="outlined"
            name="Git Hub"
            value={github}
            label="Git Hub"
            onChange={(e) => setGitHub(e.target.value)}
            placeholder="github.com"
          />
        </Grid>
        <Grid item xs={6} style={{ paddingBlock: "20px" }}>
          <TextField
            id="email"
            variant="outlined"
            name="Twitter"
            value={twitter}
            label="twitter"
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="twitter.com/"
          />
        </Grid>
        <br></br>
        <br></br>
        <Grid item xs={3} style={{ paddingTop: "30px" }}>
          <CustomButton
            handleClick={updateUserData}
            loading={false}
            text={"Update"}
            fullWidth={true}
          />
        </Grid>
      </Grid>
    </form>
  );
}
