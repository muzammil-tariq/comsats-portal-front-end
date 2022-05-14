import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTaskIcon from "@mui/icons-material/AddTask";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { Tooltip, Zoom, IconButton, Menu, MenuItem } from "@mui/material";
import {
  DataGrid,
  GridCellValue,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { getAllGroups } from "src/features/groups/groupActions";
import { groupSelector } from "src/features/groups/groupSlice";
import { joinRequestGroup } from "src/features/projects/projectActions";
import { CustomAlert } from "../base/CustomAlert";
import CustomFilterDataTable from "../base/CustomFilterDataTable";
import rows from "./data.json";

export default function GroupList() {
  const [rows, setRows] = useState<any[]>([]);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [applyFlag, setApplyFlag] = React.useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const { groups, groupsSuccessful, groupsFailed } = useSelector(groupSelector);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllGroups());
    };
    getData();
    if (groups) {
      const st: any = groups.map(({ _id, name, leaderId, creationDate }) => {
        const id = _id;
        const date = creationDate.toString();
        return {
          id,
          name,
          leaderId,
          date,
        };
      });
      setRows(st);
    }
  }, [groups]);
  const handleApply = async (id: any) => {
    setApplyFlag(false);
    await dispatch(joinRequestGroup(id, "61e27b929b0629eab760ee7a"));
    setApplyFlag(true);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "SrNo", width: 300 },
    { field: "name", headerName: "Group Name", width: 250 },
    { field: "leaderId", headerName: "Group Leader", width: 300 },
    {
      field: "date",
      headerName: "Proposed During",
      width: 350,
    },
    {
      field: "apply",
      headerName: "",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const onClick = (e: any, str: string) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && Boolean(c))
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          // history.push({ pathname: "/rubric-list", state: thisRow?.rubric });
          if (str === "apply") {
            // apply for a project
            // alert("Successfully applied for a project");
            // console.log(thisRow, params.id);
            handleApply(params.id);
            handleCloseMenu();
          }
        };
        return (
          <>
            {/* <Tooltip title="See Options"> */}
            <IconButton onClick={handleClick}>
              <LinearScaleIcon />
              {/* <MoreHorizSharpIcon /> */}
            </IconButton>
            {/* </Tooltip> */}

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
              <MenuItem onClick={handleCloseMenu}>
                {" "}
                <Tooltip title="Send join request.">
                  <IconButton onClick={(e) => onClick(e, "join")}>
                    <GroupAddIcon />
                  </IconButton>
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                {" "}
                <Tooltip title="Apply for Project">
                  <IconButton onClick={(e) => onClick(e, "apply")}>
                    <AddTaskIcon />
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
    <div style={{ width: "100%" }}>
      <CustomFilterDataTable
        rows={rows}
        columns={columns}
        // pageSize={pageSize}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // rowsPerPageOptions={[5, 10, 20]}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
      />
      {applyFlag && <CustomAlert type="success" content={"Request sent to group successfully!"} />}
    </div>
  );
}
