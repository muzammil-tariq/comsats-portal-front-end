import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Grid, ListItemButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { useAppDispatch } from "src/app/hooks";
import { openDrawerAction } from "src/features/settings/settingsSlice";
import { userType } from "src/types/user.enum";
import { facultyItems, studentItems } from "./navItems";
import { adminItems } from "./navItems/adminItems";
import { DRAWER_WIDTH } from "./SideNav";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    // toolbar: theme.mixins.toolbar,
    logo: {
      width: DRAWER_WIDTH - 50,
      height: DRAWER_WIDTH - 50,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    nested: {
      paddingLeft: theme.spacing(9),
    },
  })
);

export function DrawerContent() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);
  const location = useLocation();
  const [expand, setExpand] = useState<string>(location.pathname);
  useEffect(() => {
    const type: string | null = localStorage.getItem("type");
    if (type) {
      switch (type) {
        case userType.STUDENT:
          setItems(studentItems);
          break;
        case userType.FACULTY:
          setItems(facultyItems);
          break;
        case userType.ADMIN:
          setItems(adminItems);
          break;
        // TODO : add items for other roles
        default:
          break;
      }
    }
    // setExpand(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();

  return (
    <>
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Tooltip placement="right" title="Comsats University Islamabad">
          <Link to="/">
            <img
              className={classes.logo}
              src="/favicon/uniLogo.png"
              alt="logo"
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
        </Tooltip>
      </Grid>
      <List>
        {items.map((route, i) => (
          <div key={i}>
            <ListItem
              button
              component={NavLink}
              to={route.path}
              activeClassName="Mui-selected"
              onClick={() => {
                if (route?.subRoutes?.length)
                  if (expand.includes(route.path)) setExpand("");
                  else setExpand(route.path);
                dispatch(openDrawerAction(false));
              }}
            >
              <ListItemIcon>
                <route.icon />
              </ListItemIcon>
              <ListItemText>
                <Typography>{route.title}</Typography>
              </ListItemText>
              {route?.subRoutes?.length ? (
                expand?.includes(route.path) ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : (
                ""
              )}
            </ListItem>
            {route?.subRoutes?.map((sub: any, j: any) => (
              <Collapse
                key={`${i},${j}`}
                in={expand?.includes(route.path)}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem
                    button
                    key={89}
                    className={classes.nested}
                    onClick={() => {
                      // dispatch(openDrawerAction(false));
                      history.push(`${sub.path}`);
                    }}
                  >
                    {/* <ListItem
                    button
                    className={classes.nested}
                    component={NavLink}
                    // to={sub.path}
                    activeClassName="Mui-selected"
                    onClick={() => {
                      // dispatch(openDrawerAction(false));
                      history.push("/home");
                    }}
                  > */}
                    <ListItemIcon>{sub ? <sub.icon /> : ""}</ListItemIcon>
                    <ListItemText>
                      <Typography variant="caption">{sub ? sub.title : ""}</Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Collapse>
            ))}
          </div>
        ))}
      </List>
    </>
  );
}
