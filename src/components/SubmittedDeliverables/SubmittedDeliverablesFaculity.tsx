import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Modal, Box, TextField, Stack, Button } from "@mui/material";
import axios from "axios";

const SubmittedDeliverablesFaculity = () => {
  const [rows, setRows] = useState<any>([]);
  const [modalOpenClose, setModalOpenClose] = useState<boolean>(false);
  const [currentRowRubrics, setCurrentRowRubrics] = useState<any>([]);
  const [currentRowId, setCurrentRowId] = useState<string>("");
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "title", headerName: "Title", width: 220 },
    { field: "deadline", headerName: "Deadline", width: 220 },
    {
      field: "rubrics",
      headerName: "Rubrics",
      width: 300,
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
      field: "file",
      headerName: "File",
      width: 250,
      renderCell: (row) => {
        return <div>{row.row.file}</div>;
      },
    },
    {
      field: "Action",
      headerName: "Submit",
      renderCell: (row) => {
        return (
          <Button variant="outlined" onClick={() => handleOpenModal(row.row)}>
            submit
          </Button>
        );
      },
    },
  ];

  const handleGetRowId = (e: any) => {
    return e._id;
  };

  const handleOpenModal = async (e: any) => {
    setCurrentRowId(e._id);
    setCurrentRowRubrics(e.rubrics);
    handleModalOpenClose();
  };

  const handleModalOpenClose = () => {
    setModalOpenClose(!modalOpenClose);
  };

  const handleChangeModalInput = (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
    const data = currentRowRubrics.map((r: any) => {
      if (r._id === id) {
        return {
          ...r,
          obtained_score: event.target.value,
        };
      }
      return r;
    });
    setCurrentRowRubrics(data);
  };

  const handleRubricsDataSubmit = async () => {
    debugger;
    const dataToSend = {
      id: currentRowId,
      rubrics: currentRowRubrics,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:8000/api/submitted_deliverable/",
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchDeliverables();
      handleModalOpenClose();
    } catch (error) {
      console.log(error);
    }
  };

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
  useEffect(() => {
    fetchDeliverables();
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rowHeight={150} rows={rows} getRowId={handleGetRowId} columns={columns} />
      <Modal
        open={modalOpenClose}
        onClose={handleModalOpenClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "fit-content",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {currentRowRubrics.map((r: any, i: number) => (
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              autoComplete="off"
              key={i}
            >
              <TextField
                id="outlined-name"
                label={r.title}
                value={r.score}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-name"
                label="Obtained Score"
                value={r.obtained_score}
                required
                onChange={(e: any) => handleChangeModalInput(e, r._id)}
              />
            </Box>
          ))}
          <Stack spacing={2} direction="row" className="justify-content-center pt-2">
            <Button variant="contained" onClick={() => handleRubricsDataSubmit()}>
              Submit
            </Button>
            <Button variant="contained" onClick={handleModalOpenClose}>
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default SubmittedDeliverablesFaculity;
