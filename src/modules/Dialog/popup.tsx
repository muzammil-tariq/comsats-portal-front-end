import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(5),
    position: "relative",
    top: theme.spacing(10),
    right: theme.spacing(0),
    bottom: theme.spacing(10),
    left: theme.spacing(10),
  },
  dialogTitle: {
    paddingRight: "30px",
  },
  content: {
    height: "200px",
  },
}));
export default function Popup(props: {
  title: any;
  openPopup: any;
  setOpenPopup: any;
  children: any;
}) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  const state = openPopup;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const dialogeClose = () => {
    setOpen(false);

    // window.location.href = "http://localhost:3000/profile";
    // console.log("The final state value is set to ", state);
  };

  return (
    <Dialog open={state} maxWidth="lg" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex", color: "text.primary" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            style={{ backgroundColor: "red", backgroundSize: "1", border: "1" }}
            onClick={() => {
              dialogeClose();
              setOpenPopup();
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent className="content">{children}</DialogContent>
    </Dialog>
  );
}
