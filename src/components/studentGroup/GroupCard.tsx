import * as React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function GroupCard(props: any) {
  return (
    <Paper sx={{ p: 2, margin: "auto", maxWidth: 700, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="Person" src="http://cdn.onlinewebfonts.com/svg/img_237553.png" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              {props.content}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
