import * as React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AvatarCard from "src/components/Profile/AvatarCard";
import ProfileDetails from "src/components/Profile/ProfileDetails";
import SocialCard from "src/components/Profile/SocialCard";

export default function ProfileContainer() {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
      <Typography variant="h5" padding={2} color="text.primary">
        Profile
      </Typography>
      <Grid container spacing={2}>
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "row" }}> */}
        <Grid item xs={12} sm={4} md={4}>
          <AvatarCard />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <SocialCard />
        </Grid>
        {/* </div> */}
        <Grid item xs={12} sm={4} md={4} paddingLeft={10}>
          <ProfileDetails />
        </Grid>
        {/* </div> */}
      </Grid>
    </Box>
  );
}
