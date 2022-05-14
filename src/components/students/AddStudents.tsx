import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { addStudents } from "src/features/facultyStudentRelationship/templateActions";
import { getAllStudents } from "src/features/student/studentActions";
import { studentSelector } from "src/features/student/studentSlice";
import { CustomAlert } from "../base/CustomAlert";
import { CustomButton } from "../base/CustomButton";

export const AddStudents = () => {
  const [flag, setFlag] = useState(0);
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { studentsFailed, students } = useSelector(studentSelector);
  const [delis, setDelis] = useState<any[]>([]);
  const [inputError, setInputError] = useState<any>("");
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
  const handleChangeDeliv = (value: any, e: any) => {
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
        {inputError && <CustomAlert type="error" content={inputError} />}
      </Grid>
    </Grid>
  );
};
