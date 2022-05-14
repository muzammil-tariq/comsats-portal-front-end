/* eslint-disable react/no-children-prop */
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { DockTwoTone, MoreHoriz, Person } from "@material-ui/icons";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { IconButton, Menu, MenuItem, Select, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridCellValue,
  GridColDef,
  GridMoreVertIcon,
  GridToolbar,
} from "@mui/x-data-grid";
import { deleteDeliverable, getAllDeliverables } from "src/features/deliverable/deliverableActions";
import {
  deleteDeliverableError,
  deleteDeliverableSuccess,
  deliverableSelector,
} from "src/features/deliverable/deliverableSlice";
import { getStudents } from "src/features/facultyStudentRelationship/templateActions";
import {
  deleteTemplate,
  getAllTemplates,
  updateTemplate,
} from "src/features/template/templateActions";
import {
  deleteTemplateError,
  deleteTemplateSuccess,
  templateSelector,
} from "src/features/template/templateSlice";
import ConfirmationDialog from "../base/ConfirmationDialog";
import { CustomAlert } from "../base/CustomAlert";
import { CustomButton } from "../base/CustomButton";
import { CustomInput } from "../base/CustomInput";
import { CustomTypography } from "../base/CustomTypography";

export default function AllStudents() {
  const history = useHistory();
  // rows for table
  const [rows, setRows] = useState<any>([]);
  const [dFlag, setdFlag] = useState(0);
  const [uFlag, setuFlag] = useState(0);
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    getStudentsByFacultyId();
  }, []);
  const getStudentsByFacultyId = async () => {
    const data = await getStudents();
    debugger;
    console.log(data);
    setStudents(
      data?.data.map((item: any) => {
        return {
          ...item.student,
          id: item.student._id,
        };
      })
    );
  };
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const {
    templatesFailed,
    templatesSuccessful,
    templates,
    gettingTemplates,
    templateDeleteFailed,
    templateDeleteSuccessful,
    templateUpdateFailed,
    templateUpdateSuccessful,
  } = useSelector(templateSelector);

  const getTemps = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllTemplates());
      // console.log(templatesSuccessful);
    } catch (er) {
      // console.log(templatesFailed);
    }
  };
  useEffect(() => {
    getTemps();

    if (templates) {
      const st: any = templates.map(({ _id, deliverable, title, file }) => {
        const id = _id;
        // console.log(id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const deliverableName: any = deliverable.title;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const deliverableDeadline: any = deliverable.deadline;
        return {
          id,
          title,
          deliverableName,
          deliverableDeadline,
        };
      });
      setRows(st);
      console.log(st);
    }
  }, []);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currRow, setCurrRow] = React.useState<any>(null);
  // form dialog for delete
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };
  const handleDelete = async () => {
    handleCloseDelete();
    // delete call
    await dispatch(deleteTemplate(currRow.id));
  };
  const open = Boolean(anchorEl);

  // form dialog for update
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdateDialog(false);
  };
  const [uvalues, setUValues] = React.useState<any>({
    title: "",
    // deadline: new Date(),
  });
  const handleChangeU = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUValues({ ...uvalues, [prop]: event.target.value });
  };
  const handleUpdate = async () => {
    handleCloseUpdate();
    // delete call
    await dispatch(updateTemplate(uvalues, currRow.id));
    getTemps();
    if (templates) {
      const st: any = templates.map(({ _id, deliverable, title, file }) => {
        const id = _id;
        // console.log(id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const deliverableName: any = deliverable.title;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const deliverableDeadline: any = deliverable.deadline;
        return {
          id,
          title,
          deliverableName,
          deliverableDeadline,
        };
      });
      setRows(st);
      // console.log(st);
    }
  };
  const options = ["Delete"];

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "FirstName",
      width: 270,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 270,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 270,
      editable: true,
    },
    // {
    //   field: "deliverableName",
    //   headerName: "Deliverable",
    //   width: 270,
    //   editable: true,
    // },
    // {
    //   field: "deliverableDeadline",
    //   headerName: "Deadline",
    //   width: 300,
    //   editable: true,
    // },
    {
      field: "manage",
      // renderHeader: () => null,
      headerName: "Manage",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        const handleClose = (e: any, val: string) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && Boolean(c))
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          setCurrRow(thisRow);
          // console.log(thisRow, val);
          setAnchorEl(null);
          if (val === "Delete") {
            handleClickOpenDelete();
          }
        };
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        };
        return (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <GridMoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 40 * 4.5,
                  width: "10ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={(e: any) => handleClose(e, option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        // components={{
        //   Toolbar: GridToolbar,
        // }}
      />
      {/* Update Popup */}
      <ConfirmationDialog
        title="Update Template"
        handleClose={handleCloseUpdate}
        open={openUpdateDialog}
        doneText="Update"
        closeText="Cancel"
        handleSubmit={handleUpdate}
        children={
          <div style={{ padding: "3rem" }}>
            <div>
              <CustomInput
                value={uvalues.title}
                handleChange={handleChangeU("title")}
                field={"text"}
              />
            </div>
          </div>
        }
      />
      {/* Delete Popup */}
      <ConfirmationDialog
        title="Delete Template"
        handleClose={handleCloseDelete}
        open={openDeleteDialog}
        handleSubmit={handleDelete}
        closeText="Cancel"
        doneText="Confirm"
        children={
          <div style={{ padding: "1rem" }}>
            <CustomTypography
              text="Are you sure you want to delete the student?"
              variant="h6"
              component="h6"
            />
          </div>
        }
      />
      <div>
        {/* delete */}
        {templateDeleteSuccessful && (
          <CustomAlert type="success" content={"Template deleted successfully!"} />
        )}
        {templateDeleteFailed && <CustomAlert type="error" content={"Template not deleted!"} />}
        {/* update */}
        {templateUpdateSuccessful && (
          <CustomAlert type="success" content={"Template updated successfully!"} />
        )}
        {templateUpdateFailed && <CustomAlert type="error" content={"Template not updated!"} />}
      </div>
    </div>
  );
}
