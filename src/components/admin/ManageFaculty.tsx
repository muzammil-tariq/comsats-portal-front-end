import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import { IconButton, Tooltip } from "@mui/material";
import { GridCellValue, GridColDef } from "@mui/x-data-grid";
import { getAllFaculty } from "src/features/faculty/facultyActions";
import { facultySelector } from "src/features/faculty/facultySlice";
import { IStudent } from "src/features/student/studentTypes";
import { CustomButton } from "../base/CustomButton";
import CustomDataTable from "../base/CustomDataTable";

export const ManageFaculty = () => {
  const [rows, setRows] = useState<any>([]);
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { gettingFaculty, facultyFailed, facultySuccessful, faculties } =
    useSelector(facultySelector);
  const getFaculty = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllFaculty());
      console.log(facultySuccessful);
    } catch (er) {
      console.log(facultyFailed);
    }
  };
  useEffect(() => {
    const getF = async () => {
      await getFaculty();
    };
    getF();
  }, []);
  useEffect(() => {
    if (faculties) {
      const st = faculties.map(({ _id, email, firstName, lastName }) => {
        const id = _id;
        return {
          id,
          email,
          firstName,
          lastName,
        };
      });
      setRows(st);
    }
  }, [facultySuccessful]);
  // const rows = [
  //   { id: 1, name: "Snow", email: "Jon" },
  //   { id: 2, name: "Lannister", email: "Cersei" },
  //   { id: 3, name: "Lannister", email: "Jaime" },
  //   { id: 4, name: "Stark", email: "Arya" },
  // ];
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 300,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 300,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
    },
    {
      field: "update",
      headerName: "",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && Boolean(c))
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          // setAdmin(thisRow);

          // setAdmin(JSON.stringify(thisRow, null, 4));
          // handleClickOpen();
          // return;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return alert(JSON.stringify(thisRow, null, 4));
          // change admin role to super admin
        };

        return (
          <Tooltip title="Edit">
            <IconButton onClick={onClick}>
              <EditIcon />
              {/* <MoreHorizSharpIcon /> */}
            </IconButton>
          </Tooltip>
          // <CustomButton fullWidth={true} text="Give Access" loading={false} handleClick={onClick} />
        );
      },
    },
    {
      field: "delete",
      renderHeader: () => null,
      headerName: "",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && Boolean(c))
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          // setAdmin(thisRow);

          // setAdmin(JSON.stringify(thisRow, null, 4));
          // handleClickOpen();
          // return;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return alert(JSON.stringify(thisRow, null, 4));
          // change admin role to super admin
        };

        return (
          <Tooltip title="Delete">
            <IconButton onClick={onClick}>
              <Delete />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <div>
      <CustomDataTable rows={rows} columns={columns} />
    </div>
  );
};
