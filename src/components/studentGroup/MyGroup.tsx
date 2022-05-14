import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Tooltip,
  Zoom,
  Button,
  Box,
  Grid,
  ButtonBase,
  Paper,
  Typography,
  styled,
  CircularProgress,
} from "@mui/material";
import { getOneFaculty } from "src/features/faculty/facultyActions";
import { facultySelector } from "src/features/faculty/facultySlice";
import { getMyGroup } from "src/features/groups/groupActions";
import { groupSelector } from "src/features/groups/groupSlice";
import { getOneStudent } from "src/features/student/studentActions";
import { CustomTypography } from "../base/CustomTypography";
import GroupCard from "./GroupCard";
import StudentCard from "./StudentCard";

const Img = styled("img")({
  margin: "auto",
  display: "-ms-inline-grid",
  maxWidth: "100%",
  maxHeight: "100%",
});
const MyGroup = () => {
  const dispatch = useDispatch();
  const { group, groupFailed, groupSuccessful, gettingGroup } = useSelector(groupSelector);
  const { faculty } = useSelector(facultySelector);
  const [gstudents, setgStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // get my group
  useEffect(() => {
    const getGroupInfo = async () => {
      try {
        // pass the function in dispatch
        const grp: any = await dispatch(getMyGroup("61b8ea99cded32732f3fa36b"));
        // console.log(grp);

        if (grp) {
          await dispatch(getOneFaculty(grp.facultyId));
          if (grp.students.length > 0) {
            // eslint-disable-next-line prefer-const
            let arr: any = [];
            grp.students.map(async (std: any) => {
              const student = await dispatch(getOneStudent(std));
              if (student) {
                arr.push(student);
              }
            });
            // console.log("ll", students);
            // if (gstudents.length < 0) {
            setgStudents(arr);
            // }
          }
        }
        console.log(faculty);
      } catch (er) {
        // console.log(facultyFailed);
      }
    };
    setLoading(true);
    getGroupInfo();
    setLoading(false);
  }, []);

  return (
    <div style={{ padding: "0.5rem", width: "100%" }}>
      <h2>My Group</h2>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container style={{ padding: "1rem", border: "1px solid ", borderRadius: "5px" }}>
          <Grid item xs={12} sm={12} md={12}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h3>Details: </h3>
              <Tooltip TransitionComponent={Zoom} title="Make changes to your groups.">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    alert("Change Settings Prompt ..!");
                  }}
                  startIcon={<SettingsIcon />}
                >
                  Manage Group
                </Button>
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div style={{ justifyContent: "center" }}>
              <h4>{group && group?.name}</h4>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0.5rem",
              }}
            >
              <h4>Student</h4>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {gstudents &&
                  gstudents.map((std: any) => {
                    // console.log(sxstd);

                    return (
                      <div key={std._id}>
                        <GroupCard
                          content={
                            <>
                              <Typography gutterBottom variant="subtitle1" component="div">
                                {`${std.firstName} ${std.lastName}`}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {std.email}
                              </Typography>
                            </>
                          }
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0.5rem",
              }}
            >
              <h4>Supervisor</h4>
              <GroupCard
                content={
                  <>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {faculty && `${faculty.firstName} ${faculty.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {faculty && `${faculty.email}`}
                    </Typography>
                  </>
                }
              />
              <h4>Co-Supevisor</h4>
              <CustomTypography text="No Supervisor found!" variant="h6" component="h6" />
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default MyGroup;
