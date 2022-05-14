import * as React from "react";
import { DataGrid, GridRowId, GridToolbar } from "@mui/x-data-grid";

interface Props {
  rows: any;
  columns: any;
  // setSelectedRow?: any;
}

export default function CustomFilterDataTable(props: Props) {
  const { rows, columns } = props;
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{
          Toolbar: GridToolbar,
        }}
        // onSelectionModelChange={(ids: any) => {
        //   const selectedIDs = new Set(ids);
        //   const selectedRowData = rows.filter((row: { id: { toString: () => GridRowId } }) =>
        //     selectedIDs.has(row.id.toString())
        //   );
        //   setSelectedRow(selectedRowData);
        // }}
      />
    </div>
  );
}
