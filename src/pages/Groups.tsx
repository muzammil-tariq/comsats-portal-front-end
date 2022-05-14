import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import CreateGroup from "../components/studentGroup/CreateGroup";
import JoinGroup from "../components/studentGroup/JoinGroup";
import SeeGroupList from "../components/studentGroup/SeeGroupList";

const Groups = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h6">
        You have not joined any groups yet. <br />
      </Typography>
      <Typography variant="h5" style={{ paddingTop: "5rem" }}>
        Make a Group or Join one.
      </Typography>
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Grid item xs={12} sm={12} md={12}>
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
              <div style={{ padding: "1rem" }}>
                <CreateGroup />{" "}
              </div>
              <div style={{ padding: "1rem" }}>
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
              <div style={{ padding: "1rem" }}>
                <JoinGroup />
              </div>{" "}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Groups;
