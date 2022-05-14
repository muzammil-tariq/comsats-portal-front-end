import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import {
  DataGrid,
  GridApi,
  GridCellParams,
  GridCellValue,
  GridColDef,
  GridValueGetterParams,
  useGridApiRef,
} from "@mui/x-data-grid";
// import { useUserContext } from "../../context-api/user/UserProvider";
import { CustomButton } from "../base/CustomButton";
import { CustomTypography } from "../base/CustomTypography";
// import { CustomDialog } from "../base/CustomDialog";
// import { ROLES } from "../../types/roles";

// const rows = [
//   { id: 1, name: "Snow", email: "Jon" },
//   { id: 2, name: "Lannister", email: "Cersei" },
//   { id: 3, name: "Lannister", email: "Jaime" },
//   { id: 4, name: "Stark", email: "Arya" },
// ];
export type User = {
  id: any;
  name: string;
  email: string;
};
interface TableProps {
  rows: any;
  columns: any;
}
export default function DataTable(props: TableProps) {
  // destructing table props
  const { rows, columns } = props;
  const [admins, setAdmins] = useState<any>([]);
  const [admin, setAdmin] = useState<any>();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  // Number ( 0-> error, 1->success, 2->unset)
  const [alert, setAlert] = useState<number>();
  // const [rows, setRows] = useState([]);
  // const columns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 200 },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 500,
  //     editable: true,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     width: 500,
  //     editable: true,
  //   },
  //   {
  //     field: "action",
  //     headerName: "Assign",
  //     sortable: false,
  //     width: 180,
  //     renderCell: (params) => {
  //       const onClick = (e: any) => {
  //         e.stopPropagation(); // don't select this row after clicking

  //         const { api } = params;
  //         const thisRow: Record<string, GridCellValue> = {};

  //         api
  //           .getAllColumns()
  //           .filter((c) => c.field !== "__check__" && Boolean(c))
  //           .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
  //         // setAdmin(thisRow);

  //         // setAdmin(JSON.stringify(thisRow, null, 4));
  //         // handleClickOpen();
  //         // return;
  //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //         // @ts-ignore
  //         return alert(JSON.stringify(thisRow, null, 4));
  //         // change admin role to super admin
  //       };

  //       return (
  //         <CustomButton fullWidth={true} text="Give Access" loading={false} handleClick={onClick} />
  //       );
  //     },
  //   },
  // ];
  const handleClickOpen = () => {
    setOpenConfirm(true);
  };

  const handleClose = (value?: string) => {
    setOpenConfirm(false);
  };
  const handleConfirm = async (value?: string) => {
    setOpenConfirm(false);
    try {
      // await updateUser(admin.id, { role: ROLES.SUPER_ADMIN });
      setAlert(1);
    } catch (er) {
      setAlert(0);
    }
    // await getUser(admin.id);
    setAlert(2);
  };
  const handleAssignRole = () => {
    handleClickOpen();
  };

  // useEffect(() => {
  //   // get all the admins from users collection
  //   const getUsers = async () => {
  //     const users = await getAllUsers();
  //     console.log("users", users);
  //     const ads: any[] = [];
  //     users.map((user: any) => {
  //       user.role && user.role === "BFSqGKp5ABvf7jXpaztU" && ads.push(user);
  //       // console.log(user)
  //       // setAdmins([...admins, user]);
  //     });
  //     setAdmins(ads);
  //   };

  //   getUsers();
  // }, [alert]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        // onCellClick={currentlySelected}
      />

      {/* <CustomDialog
        title="Confirmation"
        selectedValue="mmm"
        open={openConfirm}
        onClose={handleClose}
        onDone={handleConfirm}
        closeText="Cancel"
        doneText="Ok"
        children={
          <CustomTypography
            text="Are you sure you want to assign role to super admin?"
            variant="h6"
            component="h6"
          />
        }
      />
      {alert === 0 ? (
        <CustomAlert
          type="error"
          content="Failed to give access: Please try again!"
        />
      ) : alert === 1 ? (
        <CustomAlert
          type="success"
          content="Admin has given access: for Super admin successfully!"
        />
      ) : null} */}
    </div>
  );
}
