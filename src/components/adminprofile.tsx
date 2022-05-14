import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { getStudentProfile } from "src/features/profile/profileActions";
import { ProfileSelector } from "src/features/profile/profileSlice";
import Dr_majid from "../../src/Assets/Dr_majid.jpg";

export default function AdminCard() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  // const dispatch = useDispatch();
  // // useSelector to get any state in the store
  // const { studentProfile, studentProfileFail, studentProfileSuccess } =
  //   useSelector(ProfileSelector);
  // const getStudent = async () => {
  //   try {
  //     // pass the function in dispatch
  //     await dispatch(getStudentProfile("61c724f9493c813114f2d53a"));
  //     console.log(studentProfileSuccess);
  //   } catch (er) {
  //     console.log(studentProfileFail);
  //   }
  // };
  const getUserData = async () => {
    // const id = "61c75e46cb743d254c895812";
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("adminId");
    console.log("the incoing token value is", token);
    console.log("the incoing admin Id  value is", adminId);
    const api = `http://127.0.0.1:8000/api/admin/${adminId}`;

    await axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setFirstName(res.data.admin.name);
        setEmail(res.data.admin.email);
        console.warn("the incoming profile data is", res.data.admin);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  //---------------------------------------------------------------------

  // useEffect Hook
  useEffect(() => {
    getUserData();
    // getStudent();
    // console.log(studentProfile);
  }, []);

  return (
    <Card sx={{ width: "900%", maxWidth: 500, margin: 19, color: "text.primary" }}>
      <Grid item xs={12} sm={4} md={4}>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <IconButton>
            <Avatar
              alt="admin"
              src={Dr_majid}
              sx={{ marginLeft: 6, width: 140, height: 150 }}
              style={{ justifySelf: "center" }}
            />
            <div style={{ marginTop: "100px", marginRight: "100px" }}>
              <EditIcon />
            </div>
          </IconButton>
        </div>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            <br />
            Admin
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Grid>
    </Card>
  );
}
