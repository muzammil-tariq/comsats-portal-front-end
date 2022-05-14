import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Logout } from "@mui/icons-material";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import GitHubIcon from "@mui/icons-material/GitHub";
// import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { Theme, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { useAppDispatch } from "src/app/hooks";
import { logout } from "src/features/auth/authSlice";
import { themeTypeAction, toggleMobileDrawerAction } from "src/features/settings/settingsSlice";
import { DRAWER_WIDTH } from "./SideNav";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
      textDecoration: "none",
      color: "unset",
    },
  })
);

export function Header() {
  // const dispatch = useAppDispatch();
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const history = useHistory();

  const isDarkTheme = useTheme().palette.mode === "dark";
  const toggleTheme = () => {
    dispatch(themeTypeAction(isDarkTheme ? "light" : "dark"));
  };
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    history.push("/login");
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(toggleMobileDrawerAction())}
            className={classes.menuButton}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title} component={Link} to="/">
            FYP PORTAL
          </Typography>
          <IconButton aria-label="Logout" color="inherit" size="large" onClick={handleLogout}>
            {/* <LogoutIcon /> */}
            <Logout />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label="Switch between Light and Dark Theme"
            size="large"
          >
            <BrightnessHighIcon />
            {/* {isDarkTheme ? <BrightnessHighIcon /> : <Brightness4Icon />} */}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
