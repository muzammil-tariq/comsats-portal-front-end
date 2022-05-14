import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography, Grid, Box, IconButton, Button, Divider } from "@mui/material";
import Collapse from "@mui/material/Collapse";
// import SearchBar from "material-ui-search-bar";
// import Projectdetails from "./Projectdetails";

interface projectassigned {
  no: number;
  projectT: string;
  ProjectS: string;
  GroupM: string;
  Deliverables: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const originalRows: projectassigned[] = [
  {
    no: 1,
    projectT: "AsaanKharidari",
    ProjectS: "Mustafa Khattak",
    GroupM: "Rafay Javaid[sp18-BCs-69]",
    Deliverables: "Fyp-1 Scope",
  },
  {
    no: 2,
    projectT: "Project Reality",
    ProjectS: "Rashid mukhtar",
    GroupM: "Sabih Imran [Sp18-BCs-18]",
    Deliverables: "Fyp-1 Scope",
  },
  {
    no: 3,
    projectT: "Comsits",
    ProjectS: "Saira Beg",
    GroupM: "Muzamil Iqrar[Sp18-BCs-101]",
    Deliverables: "Fyp-1 SRS",
  },
  {
    no: 4,
    projectT: "Paydoor",
    ProjectS: "Qasim Malik",
    GroupM: "Obaid rehman[Sp18-BSE-090]",
    Deliverables: "Fyp-1 SDS",
  },
  {
    no: 5,
    projectT: "Daraz",
    ProjectS: "Umer Iqbal",
    GroupM: "Muneeb Qureshi[Sp18-BCs-119]",
    Deliverables: "Fyp-2",
  },
  {
    no: 6,
    projectT: "Dastan",
    ProjectS: "Dr Ashfaq Faroqi",
    GroupM: "Moiz Tahir[Sp18-Bcs-10]",
    Deliverables: "Fyp-2 evaluation",
  },
];
interface Projectdetails {
  date: string;
  docType: string;
  num: number;
}

const createdata: Projectdetails[] = [
  {
    num: 20,
    date: "2020-01-05",
    docType: "Scope Document",
  },
  {
    num: 20,
    date: "2020-01-02",
    docType: "SDS Document",
  },
];

export default function AssignProjects() {
  const [rows, setRows] = useState<projectassigned[]>(originalRows);
  const [searched, setSearched] = useState<string>("");

  const [row] = useState<Projectdetails[]>(createdata);
  const [open, setOpen] = React.useState(false);

  const restartform = () => {
    window.location.href = "http://localhost:3000/Assignproject/details";
  };

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((rows) => {
      return rows.projectT.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography style={{ paddingBlockStart: "30px" }}>
          {"Project Assigned For Evaluation"}
        </Typography>

        <Paper style={{ paddingBlock: "40px" }}>
          {/* <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          /> */}
          <Grid container>
            <Grid item xs={11} sm={11} md={11}>
              <TableContainer>
                <Table className={classes.table} aria-label="Semantic Elements">
                  <TableHead>
                    <TableRow
                      style={{
                        // backgroundColor: "#630330",
                        fontWeight: "bold",
                      }}
                    >
                      <TableCell>SR no.</TableCell>
                      <TableCell align="right">Project Title</TableCell>
                      <TableCell align="right">Project Supervisor</TableCell>
                      <TableCell align="right">Group Members</TableCell>
                      <TableCell align="right">Deliverables Evaluation Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((rows) => (
                      <TableRow key={rows.no}>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                          >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>

                        <TableCell align="right">
                          <Button onClick={() => restartform()}>{rows.projectT}</Button>
                        </TableCell>
                        <TableCell align="right">{rows.ProjectS}</TableCell>
                        <TableCell align="right">{rows.GroupM}</TableCell>
                        <TableCell align="right">
                          {rows.Deliverables}
                          <Divider />
                          <Button
                            variant="contained"
                            color="success"
                            style={{
                              borderRadius: "50",
                              backgroundColor: "green",
                              borderWidth: 10,
                            }}
                          >
                            Success
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell style={{ paddingBottom: 10, paddingTop: 20 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                              Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    <Typography>Date</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography>Document</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography>Marks</Typography>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row.map((row) => (
                                  <TableRow key={row.docType}>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.docType}</TableCell>
                                    <TableCell align="left">{row.num}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </React.Fragment>
  );
}
