import * as React from "react";
import { useHistory } from "react-router";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { CustomButton } from "../base/CustomButton";
import { CustomTypography } from "../base/CustomTypography";

interface Props {
  location?: any;
}
export default function RubricList(props: Props) {
  const history = useHistory();
  const rubric = props.location.state;
  const list = rubric.rubricItem;
  console.log(list);

  return (
    <div>
      <CustomButton
        loading={false}
        handleClick={() => {
          history.push("/deliverables");
        }}
        text={"Back to All Deliverables"}
      />
      <List sx={{ width: "100%", maxWidth: 1200, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>{/* <Avatar>{1}</Avatar> */}</ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <div
                  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                >
                  <CustomTypography text="Item No" variant="h6" component="h6" />
                  <CustomTypography text="Item Description" variant="h6" component="h6" />
                  <CustomTypography text="Item Score" variant="h6" component="h6" />
                </div>
              </React.Fragment>
            }
            // secondary="Score"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        {list &&
          list.map((item: any, i: string) => (
            <div key={i}>
              <ListItem alignItems="center">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <CustomTypography text="Item No" variant="h6" component="h6" /> */}
                        <div style={{ marginLeft: "3rem" }}>
                          {" "}
                          <Avatar>{i}</Avatar>{" "}
                        </div>

                        {/* <CustomTypography text="Item Description" variant="h6" component="h6" /> */}
                        <CustomTypography
                          text={item.title}
                          variant="subtitle"
                          component="subtitle"
                        />

                        {/* <CustomTypography text="Item Score" variant="h6" component="h6" /> */}
                        <CustomTypography
                          text={item.score}
                          variant="subtitle"
                          component="subtitle"
                        />
                      </div>
                    </React.Fragment>
                  }
                  // secondary="Score"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
      </List>
    </div>
  );
}
