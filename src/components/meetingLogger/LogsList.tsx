import * as React from "react";
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import Rows from "./data.json";
import { Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import LogDetails from "./LogDetails";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function LogList({ rows }: any) {
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "SrNo", width: 100 },
    { field: "title", headerName: "Log Title", width: 250 },
    { field: "user", headerName: "Written by", width: 250 },
    {
      field: "uploadDate",
      headerName: "Written on",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
    },
    {
      field: "options",
      headerName: "",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const onClick = (e: any) => {
          alert("Delete Log");
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
                {" "}
                <LogDetails />
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                {" "}
                <Tooltip title="Delete Log">
                  <IconButton onClick={onClick}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                {" "}
                <Tooltip title="Edit Log">
                  <IconButton onClick={onClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </MenuItem>
            </Menu>
          </>

          // <CustomButton fullWidth={true} text="Give Access" loading={false} handleClick={onClick} />
        );
      },
    },
  ];
  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={Rows.Rows}
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
