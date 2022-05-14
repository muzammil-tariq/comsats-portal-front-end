import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { GridCellValue, GridColDef } from "@mui/x-data-grid";
import { CustomButton } from "src/components/base/CustomButton";
import CustomDataTable from "src/components/base/CustomDataTable";
import CustomFilterDataTable from "src/components/base/CustomFilterDataTable";
import { CustomTypography } from "src/components/base/CustomTypography";
import AllProjectsPage from "src/components/studentProjects/AllProjectsPage";
import { createProject, getAllProjects } from "src/features/projects/projectActions";
import { projectReducer, projectSelector } from "src/features/projects/projectSlice";
import { CustomInput } from "../components/base/CustomInput";
import ProjectDetails from "src/components/studentProjects/ProjectDetails";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface State {
  title: string;
  ProjectMethodology: string;
  description: string;
  ProjectToolsandTechnology: string;
  ProjectOutcome: string;
}

const ProjectList = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [curProject, setCurProject] = useState<any>(null);
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const {
    projectsSuccessful,
    projectsFailed,
    projects,
    projectSuccessful,
    projectFailed,
    project,
    projectCreateFailed,
    projectCreateSuccessful,
  } = useSelector(projectSelector);
  const getProjects = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllProjects());
      console.log(projectsSuccessful);
    } catch (er) {
      console.log(projectsFailed);
    }
  };

  // const getProject = async (v: any) => {
  //   try {
  //     // pass the function in dispatch
  //     await dispatch(getOneProject(v));
  //     console.log(projectSuccessful);
  //   } catch (er) {
  //     console.log(projectFailed);
  //   }
  //   console.log("this is One Project", project);
  // };

  useEffect(() => {
    const getS = async () => {
      await getProjects();
    };
    getS();
    if (projects) {
      const st = projects.map(({ _id, title, description, uploadDate, user, status }) => {
        const id = _id;
        return {
          id,
          title,
          description,
          uploadDate,
          user,
          status,
        };
      });
      // console.log(st);
      setRows(st);
    }
  }, [projectsSuccessful, projectCreateSuccessful]);
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    ProjectMethodology: "",
    ProjectToolsandTechnology: "",
    ProjectOutcome: "",
  });

  const [errors, setErrors] = React.useState<State>({
    title: "",
    description: "",
    ProjectMethodology: "",
    ProjectToolsandTechnology: "",
    ProjectOutcome: "",
  });
  const [open, setOpen] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // states
  // columns
  //paste columns
  // const columns: GridColDef[] = [
  //   { field: "id", headerName: "SrNo", width: 150 },
  //   { field: "title", headerName: "Project Title", width: 250 },
  //   { field: "user", headerName: "ProposedBy", width: 250 },
  //   {
  //     field: "uploadDate",
  //     headerName: "Proposed During",
  //     width: 250,
  //   },
  //   {
  //     field: "status",
  //     headerName: "Availability",
  //     width: 150,
  //   },

  //   },
  // ];

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

  const handleClose = () => {
    setOpen(false);
    // comment
  };
  const handleClickOpenDetails = () => {
    setOpenDetails(true);
    console.log(curProject);

    setScroll("paper");
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    // comment
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const applyProject = async () => {
    try {
      // pass the function in dispatch
      await dispatch(createProject(values));
      alert("Project Proposed.");
      console.log(projectCreateSuccessful);
    } catch (er) {
      console.log(projectCreateFailed);
    }
  };
  const handleApply = () => {
    applyProject();
    //
    handleClose();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "SrNo", width: 200 },
    { field: "title", headerName: "Project Title", width: 230 },
    { field: "user", headerName: "Proposed By", width: 200 },
    {
      field: "uploadDate",
      headerName: "Proposed During",
      width: 250,
    },
    {
      field: "status",
      headerName: "Availability",
      width: 170,
    },
    {
      field: "details",
      headerName: "",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && Boolean(c))
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          // history.push({ pathname: "/rubric-list", state: thisRow?.rubric });
          setCurProject(thisRow);
          handleClickOpenDetails();
        };

        return <CustomButton loading={false} handleClick={onClick} text={"View Details"} />;
      },
    },

    {
      field: "options",
      headerName: "",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const onClick = (e: any) => {
          alert("Applied for project");
        };
        return (
          <>
            <Tooltip title="See Options">
              <IconButton onClick={handleClick}>
                <LinearScaleIcon />
                {/* <MoreHorizSharpIcon /> */}
              </IconButton>
            </Tooltip>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem>
                var Id=GridRowId;
                <ProjectDetails />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Tooltip title="Edit">
                  <IconButton onClick={onClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Tooltip title="Delete">
                  <IconButton onClick={onClick}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </MenuItem>
            </Menu>
          </>

          // <CustomButton fullWidth={true} text="Give Access" loading={false} handleClick={onClick} />
        );
      },
    },

    {
      field: "apply",
      headerName: "",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && Boolean(c))
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          // history.push({ pathname: "/rubric-list", state: thisRow?.rubric });
        };

        return <CustomButton loading={false} handleClick={undefined} text={"Apply"} />;
      },
    },
  ];

  return (
    <div>
      <h2>Student Projects</h2>s
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          paddingRight: "1rem",
          paddingBottom: "1rem",
          marginLeft: "1rem",
        }}
      >
        <Tooltip title="Propose Your own project Idea.">
          <CustomButton handleClick={handleClickOpen} loading={false} text="Propose Project" />
        </Tooltip>
        <Box sx={{ width: "50%" }}>
          <Box>
            <Dialog
              fullWidth={true}
              maxWidth="lg"
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title">Enter the Project Details.</DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <div style={{ marginBlockEnd: "2rem" }}>
                    <CustomInput
                      value={values.title}
                      handleChange={handleChange("title")}
                      field="Title"
                      type="title"
                      error={errors.title}
                      helperText={"e.g. cool project title"}
                    />
                    <CustomInput
                      value={values.description}
                      handleChange={handleChange("description")}
                      field="Description"
                      type="description"
                      error={errors.description}
                      helperText={"e.g. Breif details about your project. (3-5 lines)"}
                    />
                    <CustomInput
                      value={values.ProjectMethodology}
                      handleChange={handleChange("ProjectMethodology")}
                      field="Methodoloy"
                      type="name"
                      error={errors.ProjectMethodology}
                      helperText={
                        "e.g. first you will do LMS then do the machine learning part......."
                      }
                    />
                    <CustomInput
                      value={values.ProjectToolsandTechnology}
                      handleChange={handleChange("ProjectToolsandTechnology")}
                      field="Tools and Technologies"
                      type="name"
                      error={errors.ProjectToolsandTechnology}
                      helperText={"e.g. MERN, Machine Learning, React Native, DevOps"}
                    />
                    <CustomInput
                      value={values.ProjectOutcome}
                      handleChange={handleChange("ProjectOutcome")}
                      field="Outcome."
                      type="name"
                      error={errors.ProjectOutcome}
                      helperText={"e.g. A fully working web and Mobile application"}
                    />{" "}
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleApply}>Apply</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
        {/* project details */}
        <Box sx={{ width: "50%" }}>
          <Box>
            <Dialog
              fullWidth={true}
              maxWidth="lg"
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title">Enter the Project Details.</DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <div style={{ marginBlockEnd: "2rem" }}>
                    <CustomInput
                      value={values.title}
                      handleChange={handleChange("title")}
                      field="Title"
                      type="title"
                      error={errors.title}
                      helperText={"e.g. cool project title"}
                    />
                    <CustomInput
                      value={values.description}
                      handleChange={handleChange("description")}
                      field="Description"
                      type="description"
                      error={errors.description}
                      helperText={"e.g. Breif details about your project. (3-5 lines)"}
                    />
                    <CustomInput
                      value={values.ProjectMethodology}
                      handleChange={handleChange("ProjectMethodology")}
                      field="Methodoloy"
                      type="name"
                      error={errors.ProjectMethodology}
                      helperText={
                        "e.g. first you will do LMS then do the machine learning part......."
                      }
                    />
                    <CustomInput
                      value={values.ProjectToolsandTechnology}
                      handleChange={handleChange("ProjectToolsandTechnology")}
                      field="Tools and Technologies"
                      type="name"
                      error={errors.ProjectToolsandTechnology}
                      helperText={"e.g. MERN, Machine Learning, React Native, DevOps"}
                    />
                    <CustomInput
                      value={values.ProjectOutcome}
                      handleChange={handleChange("ProjectOutcome")}
                      field="Outcome."
                      type="name"
                      error={errors.ProjectOutcome}
                      helperText={"e.g. A fully working web and Mobile application"}
                    />{" "}
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleApply}>Apply</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Box>
            <Dialog
              fullWidth={true}
              maxWidth="lg"
              open={openDetails}
              onClose={handleCloseDetails}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title">Project Details.</DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <div style={{ marginBlockEnd: "2rem" }}>
                    <CustomTypography
                      text={`Title : ${curProject && curProject.title}`}
                      variant="subtitle"
                      component="subtitle"
                    />
                  </div>
                  <div>
                    <CustomTypography
                      text={`Status : ${curProject && curProject.status}`}
                      variant="subtitle"
                      component="subtitle"
                    />
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {/* <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleApply}>Apply</Button> */}
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </div>
      {projectsSuccessful && <CustomFilterDataTable columns={columns} rows={rows} />}{" "}
    </div>
  );
};

export default ProjectList;
