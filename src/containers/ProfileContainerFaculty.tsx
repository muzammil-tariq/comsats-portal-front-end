import * as React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AvatarCardfaculty from "src/components/Facultyprofile/Avatarcardfaculty";
import ProfileDetailsfaculty from "src/components/Facultyprofile/ProfileDetailsfaculty";

export default function ProfileContainerFaculty() {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
      <Typography variant="h5" padding={2} color="text.primary">
        Profile
      </Typography>
      <Grid container spacing={2}>
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "row" }}> */}
        <Grid item xs={12} sm={5} md={5}>
          {/* <AvatarCard /> */}
          <AvatarCardfaculty />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ProfileDetailsfaculty />
        </Grid>
        {/* </div> */}
        <Grid item xs={12} sm={4} md={4} paddingLeft={10}>
          {/* <ProfileDetails /> */}
        </Grid>
        {/* </div> */}
      </Grid>
    </Box>
  );
}
