import * as React from "react";
import { useDispatch } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  deleteStudents,
  getStudents,
} from "src/features/facultyStudentRelationship/templateActions";
import { getAllTemplates } from "src/features/template/templateActions";
import ConfirmationDialog from "../base/ConfirmationDialog";
import { CustomTypography } from "../base/CustomTypography";

export default function AllStudents() {
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    getStudentsByFacultyId();
  }, []);
  const getStudentsByFacultyId = async () => {
    const data = await getStudents();
    console.log(data);
    if (data)
      setStudents(
        data?.data.map((item: any) => {
          return {
            ...item.student,
            id: item.student._id,
          };
        })
      );
  };
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store

  const getTemps = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllTemplates());
      // console.log(templatesSuccessful);
    } catch (er) {
      // console.log(templatesFailed);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currRow, setCurrRow] = React.useState<any>(null);
  // form dialog for delete
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };
  const handleDelete = async () => {
    handleCloseDelete();
    // delete call
    try {
      await deleteStudents([currRow.id]);
      getStudentsByFacultyId();
    } catch (error) {}
  };
  const open = Boolean(anchorEl);

  // form dialog for update
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdateDialog(false);
  };
  const [uvalues, setUValues] = React.useState<any>({
    title: "",
    // deadline: new Date(),
  });
  const handleChangeU = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUValues({ ...uvalues, [prop]: event.target.value });
  };
  const options = ["Delete"];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 270 },

    {
      field: "firstName",
      headerName: "FirstName",
      width: 270,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 270,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 270,
      editable: true,
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        // components={{
        //   Toolbar: GridToolbar,
        // }}
      />

      {/* Delete Popup */}
      <ConfirmationDialog
        title="Delete Template"
        handleClose={handleCloseDelete}
        open={openDeleteDialog}
        handleSubmit={handleDelete}
        closeText="Cancel"
        doneText="Confirm"
      >
        <div style={{ padding: "1rem" }}>
          <CustomTypography
            text="Are you sure you want to delete the student?"
            variant="h6"
            component="h6"
          />
        </div>
      </ConfirmationDialog>
    </div>
  );
}
