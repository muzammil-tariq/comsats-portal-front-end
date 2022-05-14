import React from "react";
import Container from "@material-ui/core/Container";
import {
  Box,
  Card,
  DialogContentText,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { CustomButton } from "../base/CustomButton";

export default function Complainform() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [subcategory, setSubCategory] = React.useState("");
  const [nature, setNature] = React.useState("");
  const [details, setDetails] = React.useState("");
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  ///////////////////// ADD COMPLAINT ////////////////////////
  const postUserComplaint = async () => {
    const id = localStorage.getItem("studentId");
    const complainer = localStorage.getItem("type");
    console.log("the incoming student Id  value is", id);
    const api = "http://127.0.0.1:8000/api/complaint/add";
    const userData = {
      userId: id,
      categoryName: category,
      subcategoryName: subcategory,
      nature: nature,
      details: details,
      complainer: complainer,
      status: "pending",
      image: "no image",
    };
    console.log("outgoing object is ", userData);
    await axios
      .post(api, userData)
      .then((res) => {
        setCategory("");
        setSubCategory("");
        setNature("");
        setDetails("");
        alert("Complaint Submitted Successfully");
        console.warn("the issue is", res);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };
  //---------------------------------------------------------------------

  React.useEffect(() => {
    postUserComplaint;
  }, []);

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: "primary",
        // height: "90vh",
        width: "910px",
        borderStyle: "solid",
        borderWidth: 1,
      }}
    >
      <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
        <Typography variant="h5" padding={5} paddingBottom={8}>
          Make a Complain
        </Typography>
        <Grid container style={{ display: "flex", flexDirection: "row" }}>
          <Grid item xs={2} sm={1} md={1.5}>
            <Typography style={{ paddingTop: 17, fontSize: 18 }}>Category:</Typography>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <FormControl fullWidth style={{ backgroundColor: "primary" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"category"}> Other</MenuItem>
                <MenuItem value={"Faculty"}>Faculty</MenuItem>
                <MenuItem value={"Student"}> Student</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={3} md={3} paddingTop={2} paddingLeft={10}>
            <Typography style={{ fontSize: 18 }}>Subcategory:</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              style={{
                backgroundColor: "primary",
                color: "black",
              }}
              id="email"
              value={subcategory}
              onChange={(e) => setSubCategory(e.target.value)}
              variant="outlined"
              label="Subcategory"
              placeholder="Enter a subcategory"
            />
          </Grid>
          <Grid item xs={10} sm={2} md={10} paddingTop={3}>
            <Typography variant="overline" fontSize={14}>
              Nature of complaint
            </Typography>
          </Grid>
          <Grid item xs={10} sm={2} md={10} paddingTop={1}>
            <FormControl fullWidth>
              <TextField
                style={{
                  backgroundColor: "primary",
                  fontStyle: "italic",
                }}
                id="email"
                value={nature}
                onChange={(e) => setNature(e.target.value)}
                variant="outlined"
                label="Nature"
                placeholder="Regarding to.."
              />
            </FormControl>
          </Grid>

          <Grid item xs={10} sm={2} md={10} paddingTop={3}>
            <Typography variant="overline" fontSize={16}>
              Details
            </Typography>
          </Grid>
          <Grid item xs={10} sm={2} md={10} paddingTop={1}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "primary ",
              }}
            >
              <textarea
                style={{
                  width: "100%",
                  height: "73%",

                  fontSize: "24px",
                }}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
              <Grid container>
                <Grid item xs={6} sm={6} md={6}>
                  <form>
                    <input
                      type="file"
                      name="file"
                      style={{
                        color: "primary",
                        fontSize: "17px",
                      }}
                    />
                  </form>
                </Grid>
                <Grid item xs={6} sm={6} md={6} paddingLeft={37} marginBottom={40}>
                  <form>
                    <CustomButton loading={false} handleClick={postUserComplaint} text={"Submit"} />
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContentText>
    </Container>
  );
}
