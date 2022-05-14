import * as React from "react";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Zoom from "@mui/material/Zoom";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, Grid } from "@mui/material";
import { getMyGroup } from "src/features/groups/groupActions";
import { CustomTypography } from "../base/CustomTypography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupSelector } from "src/features/groups/groupSlice";

export default function JoinRequest() {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { group, groupFailed, groupSuccessful, gettingGroup } = useSelector(groupSelector);
  const [loading, setLoading] = useState<boolean>(false);

  // get my group
  useEffect(() => {
    const getGroupInfo = async () => {
      try {
        // pass the function in dispatch
        const grp: any = await dispatch(getMyGroup("61b8ea99cded32732f3fa36b"));
        console.log(group);
      } catch (er) {
        // console.log(facultyFailed);
      }
    };
    setLoading(true);
    getGroupInfo();
    setLoading(false);
  }, []);
  return (
    <Box
      sx={{
        width: 420,
        height: 150,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} style={{ margin: "auto", maxWidth: 800 }}>
          {group && group.requests && group.requests.length <= 0 && (
            <CustomTypography text={"No Group Requests Found!"} variant="h6" component="h6" />
          )}
          {group &&
            group.requests &&
            group.requests.length > 0 &&
            group.requests.map((req: any, key: number) => {
              return (
                <Grid item xs={12} sm={12} key={key}>
                  <Card sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Join Request sent to :
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          Group Name 101
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                        <Tooltip TransitionComponent={Zoom} title="Cancel Request.">
                          <IconButton aria-label="Cancel Request">
                            <CloseIcon sx={{ height: 38, width: 38 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      style={{ height: 130, width: 130, paddingTop: 10 }}
                      image="http://cdn.onlinewebfonts.com/svg/img_237553.png"
                      alt="Live from space album cover"
                    />
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      )}
    </Box>
  );
}
