import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Password } from "@mui/icons-material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { TextField, IconButton } from "@mui/material";
import axios from "axios";
import { CustomButton } from "../../components/base/CustomButton";

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
};

export default function Facultyform() {
  const [values, setValues] = useState(initialFValues);
  const resetForm = () => {
    setValues(initialFValues);
  };

  const [profileData, setProfileData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

        console.log("the incoming profile data is", res.data.faculty);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  //---------------------------------------------------------------------

  /////////////////////UPDATING USER PROFILE DATA////////////////////////
  const updateUserData = async () => {
    const token = localStorage.getItem("token");
    const facultyId = localStorage.getItem("facultyId");
    console.log("the incoing token value is", token);
    console.log("the incoing student Id  value is", facultyId);
    const api = `http://127.0.0.1:8000/api/faculty/${facultyId}`;
    const data = {
      firstName: firstName,
      lastName: lastName,
      contact: contact,
    };

    console.log("the updated value is set to", data);
    await axios
      .patch(api, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        alert("User Profile updated");
        console.log("the incoming response for update profile is", res.data);
        window.location.href = "http://localhost:3000/faculty-profile";
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            id="name"
            variant="outlined"
            value={firstName}
            name="name"
            label="Name"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Name"
          />
        </Grid>

        <Grid item xs={6} style={{ paddingTop: "20px" }}>
          <TextField
            id="name"
            variant="outlined"
            name="Last Name"
            value={lastName}
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            placeholder=""
          />
        </Grid>

        {/* <Grid item xs={6}>
          <TextField
            id="email"
            variant="outlined"
            name="email"
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
          />
        </Grid> */}

        <Grid item xs={12} className={"pt-20"}>
          <TextField
            id="Phone"
            variant="outlined"
            name="Contact"
            value={contact}
            label="Contact"
            onChange={(e) => setcontact(e.target.value)}
            placeholder="03xx-xxxxxxx"
          />
        </Grid>
        <Grid item xs={6} className={"pt-100"}>
          <CustomButton handleClick={updateUserData} loading={false} text={"update"} />
        </Grid>
      </Grid>
    </form>
  );
}
