import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageOutlined from "@mui/icons-material/ImageOutlined";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Autocomplete,
  Button,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { createDeliverable, getAllDeliverables } from "src/features/deliverable/deliverableActions";
import { deliverableSelector } from "src/features/deliverable/deliverableSlice";
import { IDeliverable } from "src/features/deliverable/deliverableTypes";
import { createNewTemplate } from "src/features/template/templateActions";
import { templateSelector } from "src/features/template/templateSlice";
import { CustomAlert } from "../base/CustomAlert";
import { CustomButton } from "../base/CustomButton";
import { CustomInput } from "../base/CustomInput";
import { CustomTypography } from "../base/CustomTypography";

interface TempState {
  title: string;
  deadline: Date | null;
}
export const AddTemplate = () => {
  const [flag, setFlag] = useState(0);
  // values of deliverable
  const [values, setValues] = React.useState<TempState>({
    title: "",
    deadline: new Date(),
  });
  const [error, setError] = React.useState<TempState>({
    title: "",
    deadline: new Date(),
  });
  const handleChange = (prop: keyof TempState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { creatingTemplate, templateCreateFailed, templateCreateSuccessful } =
    useSelector(templateSelector);
  const { deliverablesSuccessful, deliverablesFailed, deliverables } =
    useSelector(deliverableSelector);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [delis, setDelis] = useState<any[]>([]);
  const [inputError, setInputError] = useState<any>("");
  const [deliv, setDeliv] = useState<any>("");

  useEffect(() => {
    const getDeliverables = async () => {
      try {
        // pass the function in dispatch
        await dispatch(getAllDeliverables());
        console.log(deliverablesSuccessful);
      } catch (er) {
        console.log(deliverablesFailed);
      }
    };
    getDeliverables();
    if (deliverables) {
      const st: any[] = deliverables.map(({ _id, title }) => {
        const id = _id;
        return {
          id,
          title,
        };
      });
      console.log(st);
      setDelis(st);
    }
  }, []);

  const handleClick = async () => {
    if (!values.title || !deliv || !selectedFile) {
      setInputError("Invalid Fields!");
      return;
    }
    setInputError("");
    setFlag(1);
    const obj = {
      title: values.title,
      deliverable: deliv?.id,
      file: selectedFile,
    };
    await dispatch(createNewTemplate(obj));
    if (templateCreateSuccessful) {
      setFlag(2);
    }
    if (templateCreateFailed) {
      setFlag(3);
    }
    console.log(flag);
  };
  const fileUpload = (e: any) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  const handleChangeDeliv = (value: any) => {
    // console.log(value);
    setDeliv(value);
  };
  return (
    <Grid container spacing={2} style={{ margin: "auto", maxWidth: 800 }}>
      <Grid item xs={12} sm={12}>
        <CustomInput
          value={values.title}
          handleChange={handleChange("title")}
          field="Title"
          type="text"
          error={error.title}
          // helperText={error.title}
        />
      </Grid>
      {/* choose deliverable to upload template */}
      <Grid item xs={12} sm={12}>
        <Autocomplete
          fullWidth
          id="free-solo-demo"
          options={delis}
          getOptionLabel={(option) => option.title}
          onChange={(e: any, value: any) => handleChangeDeliv(value)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" fullWidth label="Choose Deliverable" />
          )}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
      >
        <CustomTypography text="Upload File" variant="subtitle1" component="subtitle1" />
        <React.Fragment>
          <input
            color="primary"
            accept="image/*"
            type="file"
            onChange={fileUpload}
            id="file"
            style={{ display: "none" }}
          />
          <label htmlFor="file">
            <Button
              variant="outlined"
              component="span"
              // className={classes.button}
              size="large"
              color="primary"
            >
              <AttachFileIcon />
            </Button>
          </label>
        </React.Fragment>
      </Grid>
      {selectedFile && <span style={{ color: "blue", padding: "1rem" }}>{selectedFile?.name}</span>}

      <Grid item xs={12} sm={12}>
        <CustomButton
          loading={flag === 1}
          handleClick={handleClick}
          text="Add Template"
          fullWidth={true}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        {templateCreateSuccessful && (
          <CustomAlert type="success" content={"Template added successfully!"} />
        )}
        {templateCreateFailed && <CustomAlert type="error" content={"Template not added!"} />}
        {inputError && <CustomAlert type="error" content={inputError} />}
      </Grid>
    </Grid>
  );
};
