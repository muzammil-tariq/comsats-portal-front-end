import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Fyp_time from "../Project_manage/Fyp_TimeManage";

const useStyles = makeStyles((theme) => ({
  welcome: {
    marginTop: "50px",
  },
  progress: {
    marginTop: "10px",
  },
  contribution: {
    fontSize: "20px",
    marginTop: "45px",
    fontstyle: "italic",
    marginLeft: "150px",
    textDecorationLine: "underline",
  },
}));

export default function Submission() {
  const classes = useStyles();

  const value = 0.4;

  return (
    <div>
      <div style={{ marginTop: "10px" }}>Welcome, Hassan</div>
      <Grid container className={classes.welcome}>
        <Grid item lg={6}>
          <Grid container>
            <Grid item xs={2}>
              <div style={{ fontSize: "14px", marginLeft: "20px", marginTop: "10px" }}>PROJECT</div>
              <Divider />
            </Grid>
            <Grid item xs={10}>
              <div style={{ fontSize: "24px", fontStyle: "italic" }}>Crowdly: your Comfort</div>
              <Grid item xs={10}>
                <IconButton
                  style={{
                    marginLeft: "30px",
                    fontSize: "10px",
                    border: "1px solid red",
                    // borderBlockColor: "yellowgreen",
                  }}
                >
                  Web
                </IconButton>
                <IconButton
                  style={{
                    marginLeft: "30px",
                    fontSize: "10px",
                    border: "1px solid red",
                    borderBlockColor: "yellowgreen",
                  }}
                >
                  Phone
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item lg={6}>
          <Fyp_time />
        </Grid> */}

          <Grid container className={classes.welcome}>
            <Grid item lg={6}>
              <div
                style={{
                  width: 120,
                  marginTop: "50px",
                  marginLeft: "60px",
                  strokeLinecap: "butt",

                  stroke: "lime",
                  backgroundColor: "white",
                }}
              >
                <CircularProgress value={20} />
              </div>
              <div style={{ marginLeft: "70px", fontStyle: "italic", marginTop: "10px" }}>
                Project Progress
              </div>
            </Grid>

            <Grid item lg={6} style={{ marginTop: "30px" }}>
              <div style={{ marginTop: "20px" }}>Student 1:</div>
              <Box sx={{ width: "90%", mr: 1 }}>
                <LinearProgress variant="determinate" />
              </Box>
              <div style={{ marginTop: "20px" }}>Student 2:</div>
              <Box sx={{ width: "40%", mr: 1 }}>
                <LinearProgress variant="determinate" />
              </Box>
              <div style={{ marginTop: "20px" }}>Student 3:</div>
              {/* <LinearProgress completed={37} bgColor=" red" /> */}
              <Box sx={{ width: "60%", mr: 1 }}>
                <LinearProgress variant="determinate" />
              </Box>
            </Grid>
          </Grid>

          <div className={classes.contribution}>Progress and Contribution</div>
        </Grid>
        <Grid item lg={6}>
          <Fyp_time />
        </Grid>
      </Grid>
    </div>
  );
}
