import * as React from "react";
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import rows from "./data.json";
import {
  DialogProps,
  Tooltip,
  Zoom,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";

const columns: GridColDef[] = [
  { field: "id", headerName: "SrNo", width: 200 },
  { field: "ProjectTitle", headerName: "Project Title", width: 250 },
  { field: "ProposedBy", headerName: "ProposedBy", width: 250 },
  {
    field: "ProposedDuring",
    headerName: "Proposed During",
    width: 250,
  },
  {
    field: "Availibility",
    headerName: "Availibility",
    width: 200,
  },
];

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

  const [pageSize, setPageSize] = React.useState<number>(5);
  return (
    <div style={{ height: 550, width: "100%" }}>
      <Tooltip TransitionComponent={Zoom} title="Choose a group you want to join to do FYP.">
        <Button variant="outlined" size="medium" onClick={handleClickOpen} startIcon={<ListIcon />}>
          See List of Groups
        </Button>
      </Tooltip>

      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Enter the Group Details.</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div style={{ height: 550, width: "100%", marginBlockEnd: "2rem" }}>
              <DataGrid
                rows={rows.Projects}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection={true}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              alert("Join Request Sent Successfully..!");
            }}
          >
            Send Request.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
