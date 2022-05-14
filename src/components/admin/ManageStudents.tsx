import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import { IconButton, Tooltip } from "@mui/material";
import { GridCellValue, GridColDef } from "@mui/x-data-grid";
import { getAllStudents } from "src/features/student/studentActions";
import { studentSelector } from "src/features/student/studentSlice";
import { CustomButton } from "../base/CustomButton";
import CustomDataTable from "../base/CustomDataTable";
import { IStudent } from "src/features/student/studentTypes";

export const ManageStudents = () => {
  const [rows, setRows] = useState<any>([]);
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { gettingStudents, studentsFailed, studentsSuccessful, students } =
    useSelector(studentSelector);
  const getStudents = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllStudents());
      console.log(studentsSuccessful);
    } catch (er) {
      console.log(studentsFailed);
    }
  };
  useEffect(() => {
    const getS = async () => {
      await getStudents();
    };
    getS();
  }, []);
  useEffect(() => {
    if (students) {
      const st = students.map(({ _id, email, firstName, regNo }) => {
        const id = _id;
        return {
          id,
          email,
          firstName,
          regNo,
        };
      });
      console.log(st);

      setRows(st);
    }
  }, [studentsSuccessful]);
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
      headerName: "Name",
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
      field: "regNo",
      headerName: "Registration Number",
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
              {/* <MoreHorizSharpIcon /> */}
            </IconButton>
          </Tooltip>
          // <CustomButton fullWidth={true} text="Give Access" loading={false} handleClick={onClick} />
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
