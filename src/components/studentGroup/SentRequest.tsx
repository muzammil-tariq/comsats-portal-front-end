import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { CircularProgress, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { authSelector } from "src/features/auth/authSlice";
import { getMyGroup } from "src/features/groups/groupActions";
import { groupSelector } from "src/features/groups/groupSlice";
import { getOneStudent } from "src/features/student/studentActions";
import { CustomTypography } from "../base/CustomTypography";

export default function SentRequest() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { group, groupFailed, groupSuccessful, gettingGroup } = useSelector(groupSelector);
  const { currentUser } = useSelector(authSelector);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  // get my group
  useEffect(() => {
    const getGroupInfo = async () => {
      try {
        // pass the function in dispatch
        const st: any = await dispatch(
          // getOneStudent(currentUser ? currentUser._id : "61e27b929b0629eab760ee7c")
          getOneStudent("61e27b929b0629eab760ee7a")
        );
        const reqs =
          st.requestSent &&
          st.requestSent.length > 0 &&
          st.requestSent.map(async (s: any) => {
            const grp: any = await dispatch(getMyGroup(s));
            return grp;
          });
        const resolved = await Promise.all(reqs);

        setData(resolved);
      } catch (er) {
        // console.log(facultyFailed);
      }
    };
    setLoading(true);
    getGroupInfo();
    setLoading(false);
  }, []);
  return (
    // <Box
    //   sx={{
    //     width: 420,
    //     height: 150,
    //     backgroundColor: "primary.dark",
    //     "&:hover": {
    //       backgroundColor: "primary.main",
    //       opacity: [0.9, 0.8, 0.7],
    //     },
    //   }}
    // >
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} style={{ margin: "auto", maxWidth: 800 }}>
          {data && data.length <= 0 && (
            <CustomTypography text={"No Group Requests Found!"} variant="h6" component="h6" />
          )}
          {data &&
            data.length > 0 &&
            data.map((req: any, key: number) => {
              return (
                <Grid item xs={12} sm={12} key={key}>
                  <Card sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Join Request sent to :
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {req.name}
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
    </>
  );
}
