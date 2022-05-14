import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { TextField } from "@mui/material";
import axios from "axios";
import { CustomButton } from "src/components/base/CustomButton";

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
};

export default function EmployeeForm() {
  const [values, setValues] = useState(initialFValues);
  const resetForm = () => {
    setValues(initialFValues);
  };
  const [profileData, setProfileData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [contact, setContact] = useState("");

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
        setProfileData(res.data.student);
        setFirstName(res.data.student.firstName);
        setContact(res.data.student.contact);

        console.log("the incoming profile data is", res.data.student);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  //---------------------------------------------------------------------

  /////////////////////UPDATING USER PROFILE DATA////////////////////////
  const updateUserData = async () => {
    // const id = "61c75e46cb743d254c895812";
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");
    console.log("the incoing token value is", token);
    console.log("the incoing student Id  value is", studentId);
    const api = `http://127.0.0.1:8000/api/students/${studentId}`;
    const data = {
      firstName: firstName,
      contact: contact,
    };

    console.log("the updated value is set to", data);
    await axios
      .patch(api, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        alert("User Profile updated");
        window.location.href = "http://localhost:3000/profile";
        console.log("the incoming response for update profile is", res.data);
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

        <Grid item xs={6} style={{ paddingLeft: "20px" }}>
          <TextField
            id="Phone"
            variant="outlined"
            name="Contact"
            value={contact}
            label="Contact"
            onChange={(e) => setContact(e.target.value)}
            placeholder="03xx-xxxxxxx"
          />
        </Grid>
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
