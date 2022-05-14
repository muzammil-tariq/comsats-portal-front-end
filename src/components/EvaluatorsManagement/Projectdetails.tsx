import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Card, Grid, TextField, Divider, Typography } from "@mui/material";
import { CustomButton } from "../base/CustomButton";

interface Projectdetails {
  docType: string;
  num: number;
}

const createdata: Projectdetails[] = [
  {
    num: 1,
    docType: "Data representative document",
  },
  {
    num: 2,
    docType: "Process Flow",
  },
  {
    num: 3,

    docType: "Correctness of Design Models",
  },
  {
    num: 4,
    docType: "Project Domain khowldge",
  },
  {
    num: 5,
    docType: "Is Document Template followed",
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const Projectdetails = () => {
  const [row] = useState<Projectdetails[]>(createdata);
  const classes = useStyles();
  return (
    <Grid>
      <Container style={{ marginLeft: "30px" }}>
        <Row>
          <Typography variant="h6">Deliverable : SDS and 40% Implementation Fall 2021</Typography>
        </Row>
        <Row>
          <Typography variant="h6">Project : MegaMart</Typography>
        </Row>
        <Row>
          <Typography variant="body1">Assign Grades</Typography>
        </Row>
        <Divider />
      </Container>
      <Card sx={{ width: "100%", maxWidth: "95%", margin: 4 }}>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <Container style={{ marginTop: "30px" }}>
            <Typography variant="body1">Max Marks : 25</Typography>
            <Typography variant="overline">
              (Please Note that the students,with less than 50% marks, will be awarded IP status)
            </Typography>

            <TableContainer>
              <Table className={classes.table} aria-label="Semantic Elements">
                <TableHead>
                  <TableRow
                    style={{
                      // backgroundColor: "#630330",
                      fontWeight: "bold",
                    }}
                  >
                    <TableCell>Rubric Item</TableCell>
                    <TableCell align="left">Rubric Item Description</TableCell>
                    <TableCell align="center">GroupMember[1]</TableCell>
                    <TableCell align="center">GroupMember[2]</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((row) => (
                    <TableRow key={row.num}>
                      <TableCell align="left">{row.num}</TableCell>
                      <TableCell align="left">{row.docType}</TableCell>
                      <TableCell align="right">
                        <TextField
                          id="outlined-number"
                          label="Number"
                          type="number"
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          id="outlined-number"
                          label="Number"
                          type="number"
                          maxRows={2}
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid container style={{ paddingTop: "20px" }}>
              <Grid item xs={1} sm={1} md={1.5} style={{ paddingTop: "10px" }}>
                <Typography>Student 1:</Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <TextField id="outlined-default" size="small" />
              </Grid>
            </Grid>
            <Grid container style={{ paddingTop: "30px" }}>
              <Grid item xs={1} sm={1} md={1.5} style={{ paddingTop: "13px" }}>
                <Typography>Student 2:</Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <TextField id="outlined-default" size="small" />
              </Grid>
            </Grid>
            <Grid container style={{ paddingTop: "30px" }}>
              <Grid item xs={1} sm={1} md={1.5}>
                <Typography> Comments: </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <textarea
                  style={{
                    width: "100%",
                    height: "73%",
                    backgroundColor: "primary",
                    fontSize: "22px",
                  }}
                ></textarea>
              </Grid>
            </Grid>
            <Grid container style={{ paddingBlock: "15px" }}>
              <Grid item xs={1} sm={1} md={1.5}>
                <CustomButton
                  loading={false}
                  handleClick={undefined}
                  text={"Assign"}
                ></CustomButton>
              </Grid>
              <Grid item xs={1} sm={1} md={1.5}>
                <CustomButton loading={true} handleClick={undefined} text={"cancel"}></CustomButton>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Card>
    </Grid>
  );
};
