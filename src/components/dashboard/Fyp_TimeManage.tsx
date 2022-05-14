import React, { useState } from "react";
import Countdown from "react-countdown";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const useStyles = makeStyles(() => ({
  fyp_incharge: {
    marginLeft: "50%",
    marginTop: "40px",
    border: "1px solid black ",
  },
  border: {
    paddingLeft: "120px",
    paddingTop: "40px",
  },
  members: {
    marginTop: "30px",
  },
}));

export default function Fyp_time() {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item lg={9}>
          <div
            style={{
              marginLeft: "120px",
            }}
          >
            <Button variant="contained" color="primary" size="small" startIcon={<FactCheckIcon />}>
              Submissions
            </Button>
          </div>
        </Grid>
        <Grid item lg={3}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<DriveFolderUploadIcon />}
          >
            Upload now
          </Button>
        </Grid>
      </Grid>

      <div style={{ marginLeft: "40%", fontSize: "20px" }}>
        <div>T I M E - R E M A I N I N G </div>
        <div style={{ fontSize: "30px", marginLeft: "30px" }}>
          <Countdown date={Date.now() + 10000} />,
        </div>
      </div>
      <Grid container className={classes.border}>
        <Grid item sm={11}>
          <div style={{ border: "0.1px solid grey" }}>
            <div
              style={{
                marginTop: "50px",
                marginLeft: "30%",
                fontSize: "20px",
                fontStyle: "italic",
              }}
            >
              From the FYP-Incharge:
            </div>
            <Grid item sm={12}>
              <ul style={{ marginLeft: "50px", wordSpacing: "1px" }}>
                <li>
                  Time for the submission will not extended anymore
                  <span style={{ fontSize: "16px" }}>(6/12/21)</span>
                </li>
                <li style={{ marginTop: "20px" }}>
                  Final Evaluation will be start in the December
                </li>
              </ul>
            </Grid>
          </div>
        </Grid>
        <div className={classes.members}>
          <div>Project Participants</div>
          <div style={{ margin: "20px", fontStyle: "italic", fontSize: "16px" }}>
            <li> Student 1 : Sp18-Bcs-111/ISB</li>
            <li> Student 2 : Sp18-Bcs-222/ISB</li>
            <li> Student 3 : Sp18-Bcs-333/ISB</li>
          </div>
        </div>
      </Grid>

      <div style={{ marginLeft: "15%" }}>
        Supervisor
        <div style={{ margin: "20px", fontStyle: "italic", fontSize: "20px" }}>
          <li> Sir Anayat Ul Rehman</li>
        </div>
      </div>
    </div>
  );
}
