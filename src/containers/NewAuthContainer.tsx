import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { height } from "@mui/system";
import { loginStudent } from "src/features/auth/authAction";
import { authSelector } from "src/features/auth/authSlice";
import LoginPage from "src/pages/LoginPage";
import background from "../imgs/auth/BGLogin.png";
import logo from "../imgs/auth/logo_login.png";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function NewAuthContainer() {
  return (
    <Box
      sx={{ flexGrow: 0, padding: "0" }}
      style={{ height: "100vh", overflow: "hidden", alignItems: "center " }}
    >
      <Grid container spacing={0} style={{ alignItems: "center" }}>
        <Grid item xs={12} sm={6} md={6} style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{ padding: "3rem" }}>
            <Item>
              {/* <Typography variant="h4" style={{ padding: "2rem" }}>
                {" "}
                FYP PORTAL
              </Typography>
              <Typography variant="h6">
                Department of Computer Science. COMSATS UNIVERSITY ISLAMABAD
              </Typography> */}
              <img src={logo} alt="Comsats Logo" width="50%" height="50%" />
              <LoginPage />
            </Item>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} style={{ justifyContent: "center", alignItems: "center" }}>
          <Item>
            <img
              src={background}
              alt="Comsats FYP Portal"
              width="70%"
              style={{ height: "50vh", padding: "1rem" }}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
