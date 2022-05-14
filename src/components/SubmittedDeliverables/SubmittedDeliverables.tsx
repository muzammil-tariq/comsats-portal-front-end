import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
// import RubricList from "../deliverables/RubricList";

const SubmittedDeliverables = () => {
  const [rows, setRows] = useState<any>([]);
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 210 },
    { field: "title", headerName: "Title", width: 210 },
    { field: "deadline", headerName: "Deadline", width: 210 },
    {
      field: "rubrics",
      headerName: "Rubrics",
      width: 360,
      renderCell: (params) => {
        return (
          <div>
            {params.row.rubrics.map((rubric: any) => {
              return (
                <>
                  {rubric.title} ({rubric.score}) obtained:{rubric.obtained_score}
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
        return <div>{row.row.file}</div>;
      },
    },
  ];
  const handleGetRowId = (e: any) => {
    return e._id;
  };
  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/submitted_deliverable/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRows(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeliverables();
  }, []);
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={rows} rowHeight={190} getRowId={handleGetRowId} columns={columns} />
    </div>
  );
};

export default SubmittedDeliverables;
