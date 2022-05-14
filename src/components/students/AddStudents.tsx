import { Console } from "console";
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
import { IDeliverable } from "src/features/deliverable/deliverableTypes";
import { addStudents } from "src/features/facultyStudentRelationship/templateActions";
import { getAllStudents } from "src/features/student/studentActions";
import { studentSelector } from "src/features/student/studentSlice";
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
export const AddStudents = () => {
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
  const { studentsFailed, students } = useSelector(studentSelector);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [delis, setDelis] = useState<any[]>([]);
  const [inputError, setInputError] = useState<any>("");
  const [deliv, setDeliv] = useState<any>("");
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getDeliverables = async () => {
      try {
        // pass the function in dispatch
        await dispatch(getAllStudents());
      } catch (er) {
        console.log(studentsFailed);
      }
    };
    getDeliverables();
  }, []);
  useEffect(() => {
    if (students) {
      debugger;
      const st: any[] = students.map(({ _id, firstName, lastName }) => {
        const id = _id;
        return {
          id,
          title: `${firstName} ${lastName}`,
        };
      });
      console.log(st);
      setDelis(st);
    }
  }, [students]);

  const handleClick = async () => {
    try {
      if (data.length === 0) {
        setInputError("Invalid Fields!");
        return;
      }
      setInputError("");
      setFlag(1);
      const dataItem = data.map((item: any) => {
        return {
          faculty: localStorage.getItem("facultyId"),
          student: item,
        };
      });
      await addStudents(dataItem);
      alert("Added successfully");
      console.log(flag);
    } catch (error) {}
  };
  const fileUpload = (e: any) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  const handleChangeDeliv = (value: any, e: any) => {
    debugger;
    console.log(delis);
    // if (e.currentTarget.classList.value.includes("MuiChip-deleteIcon")) {
    //   setData(data.filter((val: any) => val !== value[0].id));
    // } else {
    //   const index = data?.indexOf(value[0].id);
    //   if (index > 0) return;
    //   setData((prev: any) => [...prev, value[0].id]);
    // }
    setData(value.map((val: any) => val.id));
  };
  return (
    <Grid container spacing={2} style={{ margin: "auto", maxWidth: 800 }}>
      {/* choose deliverable to upload template */}
      <Grid item xs={12} sm={12}>
        <Autocomplete
          fullWidth
          id="free-solo-demo"
          options={delis}
          getOptionLabel={(option) => option.title}
          multiple={true}
          onChange={(e: any, value: any) => handleChangeDeliv(value, e)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" fullWidth label="Select Students" />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <CustomButton
          loading={false}
          handleClick={handleClick}
          text="Add Students"
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
