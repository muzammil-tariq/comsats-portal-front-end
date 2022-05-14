import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CreateGroup from "../components/studentGroup/CreateGroup";
import JoinGroup from "../components/studentGroup/JoinGroup";
import JoinRequest from "../components/studentGroup/JoinRequest";
import MyGroup from "../components/studentGroup/MyGroup";
import SentRequest from "../components/studentGroup/SentRequest";

const GroupFormed = () => {
  return (
    <div style={{ padding: "5px" }}>
      <h1>Groups</h1>
      {/* <Box sx={{ width: "100%" }}> */}
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
        {/* <Grid item xs={12} sm={12} md={12}>
          {" "}
          <div style={{ display: "flex", flexDirection: "row", height: "5rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <div style={{ padding: "5px" }}>
                <CreateGroup />{" "}
              </div>
              <div style={{ padding: "5px" }}>
                <SeeGroupList />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <div style={{ padding: "5px" }}>
                <JoinGroup />
              </div>{" "}
            </div>
          </div>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12}>
          {" "}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <MyGroup />
            </div>
            <Grid item xs={12} sm={12} md={12}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <JoinRequest />
                <SentRequest />
              </div>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {/* </Box> */}
    </div>
  );
};

export default GroupFormed;
