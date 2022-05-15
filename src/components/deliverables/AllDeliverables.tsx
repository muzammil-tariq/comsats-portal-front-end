import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

const FileInput = styled("input")({
  display: "none",
});
interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  changeTab?: Function;
}
const AllDeliverables: React.FC<Props> = (props) => {
  const [rows, setRows] = useState<any>([]);

  const SubmitDeliverable = async (e: any, row: any) => {
    debugger;
    const token = localStorage.getItem("token");

    const file = e.target.files[0];
    if (!file) return;
    const fileData = new FormData();
    console.log(row);

    fileData.append("myfile", file);
    fileData.append("rubrics", JSON.stringify(row.row.totalRubrics));
    fileData.append("title", row.row.title);
    fileData.append("deadline", row.row.deadline);
    fileData.append("faculty_id", row.row.faculty_id);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/submitted_deliverable/add",
        fileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (props.changeTab) props.changeTab(2);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    {
      field: "upload",
      headerName: "upload",
      width: 200,
      renderCell: (params) => {
        console.log(params);

        return (
          <div>
            {params.row.totalRubrics.map((rubric: any) => {
              return (
                <>
                  <span>
                    {rubric.title} ({rubric.score})
                  </span>
                </>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "totalRubrics",
      headerName: "Rubrics",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.totalRubrics.map((rubric: any) => {
              return (
                <>
                  <span>
                    {rubric.title} ({rubric.score})
                  </span>
                </>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "upload",
      headerName: "Upload",
      width: 250,
      renderCell: (row) => {
        return (
          <div>
            <label htmlFor="contained-button-file">
              <FileInput
                accept="image/*"
                onChange={(e) => SubmitDeliverable(e, row)}
                id="contained-button-file"
                type="file"
              />
              <Button variant="outlined" component="span">
                Upload
              </Button>
            </label>
          </div>
        );
      },
    },
  ];
  const handleGetRowId = (e: any) => {
    return e._id;
  };

  // ============================= useEffect ========================
  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const token = localStorage.getItem("token");
        const sId = localStorage.getItem("studentId");
        const fId = localStorage.getItem("facultyId");
        const type = localStorage.getItem("type");
        if (type === "STUDENT") {
          const response = await axios.get(
            `http://localhost:8000/api/deliverable/getByStudentId/${sId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setRows(response.data);
        }
        if (type === "FACULTY") {
          const response = await axios.get(
            `http://localhost:8000/api/deliverable/getByFacultyId/${fId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setRows(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeliverables();
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} getRowId={handleGetRowId} columns={columns} />
    </div>
  );
};

export default AllDeliverables;
