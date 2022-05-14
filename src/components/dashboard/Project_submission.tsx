import React, { useState } from "react";
// import CircularProgressbar from "react-circular-progressbar";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@mui/material";
// import ProgressBar from "@ramonak/react-progress-bar";
import Fyp_time from "./Fyp_TimeManage";

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
  },
}));

export default function Submission() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">Welcome Hasan </Typography>
      <Grid container className={classes.welcome}>
        <Grid item lg={6}>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="h5">Project: </Typography>
              <Divider />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">Crowdly, A new dream </Typography>
              <Grid item xs={10}>
                <IconButton
                  style={{
                    marginLeft: "30px",
                    fontSize: "10px",
                    border: "1px solid",
                  }}
                >
                  Web
                </IconButton>
                <IconButton
                  style={{
                    marginLeft: "30px",
                    fontSize: "10px",
                    border: "1px solid ",
                    borderBlockColor: "primary",
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
                  // stroke: "lime",
                  // backgroundColor: "white",
                }}
              >
                {/* <CircularProgressbar value={value} maxValue={20} text={`${value * 100}%`} /> */}
              </div>
              <div style={{ marginLeft: "70px", fontStyle: "italic", marginTop: "10px" }}>
                Project Progress
              </div>
            </Grid>

            <Grid item lg={6} style={{ marginTop: "30px" }}></Grid>
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

/* <Grid item lg={6}>
          <Fyp_time />
        </Grid> */
