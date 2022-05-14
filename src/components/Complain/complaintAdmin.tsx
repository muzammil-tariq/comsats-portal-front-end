import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { CustomDialog } from "src/components/base/CustomDialogForm";

const ComplaintListAdmin = () => {
  const [userId, setUserId] = React.useState(0);
  const [allData, setAllData] = React.useState([]);
  const [deleteData, setdeleteData] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [regNo, setRegno] = React.useState("");
  const [currentrow, setcurrentrow] = React.useState({
    row: { details: "", u_id: 0 },
  });
  const [openPopup, setOpenPopup] = React.useState(false);
  const [Popup, setPopup] = React.useState(false);
  const [status, setstatus] = React.useState(0);
  const [details, setdetails] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleChangeevent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  ///////////////////// FETCH ALL COMPLAINTS ////////////////////////
  const fetchAllComplaints = async () => {
    const api = "http://127.0.0.1:8000/api/complaint/all?complainer=ALL";
    await axios
      .get(api)
      .then((res) => {
        setAllData(res.data.allData);
        console.log("The data is", res.data.allData);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };
  //////////////////// Get Complaint info ////////////////////////
  const getUserData = async () => {
    // const id = "61c75e46cb743d254c895812";
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");

    const api = `http://127.0.0.1:8000/api/students/${studentId}`;

    await axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setFirstName(res.data.student.firstName);
        setRegno(res.data.student.regNo);
        setEmail(res.data.student.email);

        console.log("the incoming profile data is", res.data.student);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };
  //---------------------------------------------------------------------
  //////////////////Update status \\\\\\\\\\\\\\\\\\\\\\\\\
  const updatecomplaint = async (ID: any) => {
    const conststatus = currentrow.row.u_id;
    setstatus(conststatus);
    console.log(conststatus);
    const api = `http://127.0.0.1:8000/api/complaint/${conststatus}`;
    const userData = {
      Status: "Approved",
    };
    await axios
      .patch(api, userData)
      .then((res) => {
        setdeleteData(res.data);
        console.log(deleteData);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };
  //////////////////Delete complaint \\\\\\\\\\\\\\\\\\\\\\\\\

  const Deletecomplaint = (id: any) => {
    const constid = currentrow.row.u_id;
    setUserId(constid);
    console.log(constid);
    const api = `http://127.0.0.1:8000/api/complaint/${constid}`;
    axios
      .delete(api)
      .then((res) => {
        setdeleteData(res.data);
        console.log(deleteData);
        alert("Complaint deleted successfully");
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  React.useEffect(() => {
    fetchAllComplaints();
    getUserData();
    // Deletecomplaint(id);
  }, []);

  const handleClick = () => {
    setOpenPopup(true);
  };
  const dialogeClose = () => {
    setOpenPopup(false);
  };
  // const Resolveconflit = async () => {
  //   console.log("Item", status);
  //   allData.map((currElement: any) => setstatus(currElement.Status));
  // };
  const handleChange = () => {
    const description = currentrow.row.details;
    setdetails(description);
    setPopup(true);
  };
  const handlebuttonChange = () => {
    setPopup(false);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 250 },
    { field: "Category", headerName: "Category", width: 250 },
    { field: "SubCategory", headerName: "Sub-Category", width: 250 },
    { field: "SubCategory", headerName: "Sub-Category", width: 250 },
    { field: "SubCategory", headerName: "Sub-Category", width: 250 },
    {
      field: "Date",
      headerName: "Date & Time",
      width: 250,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 250,
    },
    {
      field: "options",
      headerName: "",
      sortable: true,
      width: 50,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.target.value;
        };
        return (
          <>
            <Tooltip title="See Options">
              <IconButton onClick={handleChangeevent}>
                <LinearScaleIcon />
                {/* {<MoreHorizSharpIcon />} */}
              </IconButton>
            </Tooltip>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              onClick={onClick}
              open={openMenu}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem>{/* <ProjectDetails /> */}</MenuItem>
              <MenuItem>
                <Tooltip title="Edit">
                  <IconButton onClick={(e) => updatecomplaint(status)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </MenuItem>
              <MenuItem>
                <Tooltip title="Details">
                  <IconButton onClick={handleChange}>{<InfoIcon />}</IconButton>
                </Tooltip>
              </MenuItem>
              <MenuItem>
                <Tooltip title="Delete">
                  <IconButton onClick={(e) => Deletecomplaint(userId)}>{<DeleteIcon />}</IconButton>
                </Tooltip>
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
        {/* <button disabled={!currentrow}> */}
        {/* <Dropdown style={{ float: "right", paddingRight: 200 }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={!currentrow}>
            =
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleClick}>Resolve</Dropdown.Item>
            <Dropdown.Item onClick={handleChange}>Detail</Dropdown.Item>
            <Dropdown.Item>Decline</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* </button> */}
      </div>
      <CustomDialog
        title="Confirm Resolve"
        open={openPopup}
        selectedValue={""}
        onClose={dialogeClose}
        closeText={"cancel"}
        onDone={updatecomplaint}
        doneText="Confirm"
      ></CustomDialog>
      <CustomDialog
        title={details}
        open={Popup}
        selectedValue={""}
        // onDone={handlebuttonChange}
        // doneText="Confirm"
        onClose={handlebuttonChange}
        closeText={"close"}
      >
        {<Typography>{firstName}</Typography>}
      </CustomDialog>
      <div style={{ height: 550, width: "90%" }}>
        <DataGrid
          onCellClick={(item: any) => setcurrentrow(item)}
          rows={allData}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </>
  );
};
export default ComplaintListAdmin;
