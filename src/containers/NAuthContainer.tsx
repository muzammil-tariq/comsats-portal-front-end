import Grid from "@material-ui/core/Grid";
import { Copyright } from "@material-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Link,
  Paper,
  styled,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import LoginPage from "src/pages/LoginPage";
import background from "../imgs/auth/BGLogin.png";
import logo from "../imgs/auth/cui.png";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const NAuthContainer = () => {
  return (
    <Box
      sx={{ flexGrow: 0, padding: "0" }}
      style={{ height: "100vh", overflow: "hidden", alignItems: "center " }}
    >
      <header style={{ padding: "1rem", justifyContent: "center", alignItems: "center" }}>
        <img src={logo} alt="Comsats FYP Portal" />
        {/* <Typography variant="h4">FYP PORTAL</Typography>
        <Typography variant="h6">
          Department of Computer Science, COMSATS UNIVERSITY ISLAMABAD
        </Typography> */}
      </header>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Item
            style={{
              height: "80vh",
              padding: "0.5rem",
            }}
          >
            <LoginPage />
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <img
              src={background}
              alt="Comsats FYP Portal"
              // width="100%"
              style={{
                height: "80vh",
                padding: "1rem",
              }}
            />
          </Item>
        </Grid>
      </Grid>
      {/* <Grid container spacing={0}>
        <Grid Item>
          
        <div style={{ width: "35%", paddingTop: "3rem" }}>
          <LoginPage />
        </div>
        </Grid>
        <div style={{ width: "65%", paddingTop: "3rem" }}>
          <img
            src={background}
            alt="Comsats FYP Portal"
            // width="100%"
            style={{
              height: "50vh",
              padding: "1rem",
            }}
          />
        </div>
      </Grid> */}
    </Box>
  );
};

export default NAuthContainer;
