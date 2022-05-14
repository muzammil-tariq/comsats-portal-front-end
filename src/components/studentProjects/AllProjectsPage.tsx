import * as React from "react";
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "SrNo", width: 200 },
  { field: "title", headerName: "Project Title", width: 250 },
  { field: "user", headerName: "ProposedBy", width: 250 },
  {
    field: "uploadDate",
    headerName: "Proposed During",
    width: 250,
  },
  {
    field: "status",
    headerName: "Availability",
    width: 200,
  },
];

export default function AllProjectsPage({ rows }: any) {
  const [pageSize, setPageSize] = React.useState<number>(5);
  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
