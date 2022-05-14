import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { CustomButton } from "../base/CustomButton";
import { CustomInput } from "../base/CustomInput";

interface DeliverableState {
  title: string;
  deadline: Date | null | any;
}
export const AddDeliverable: React.FC<{ changeDeliverableTab: any }> = (props) => {
  const [deliverableValues, setDeliverableValues] = React.useState<DeliverableState>({
    title: "",
    deadline: new Date(),
  });
  const [rubrics, setRubrics] = React.useState<any>([{ title: "", score: 0 }]);
  const [loader, setloader] = React.useState<boolean>(false);

  const handleChangeDeliverable = (
    event: React.ChangeEvent<HTMLInputElement>,
    type_d: keyof DeliverableState
  ) => {
    if (type_d === "title") {
      setDeliverableValues({ ...deliverableValues, [type_d]: event.target.value });
    } else {
      setDeliverableValues({ ...deliverableValues, [type_d]: event });
    }
  };

  const handleChangeRubrics = (i: any, e: any, name: any) => {
    const newFormValues = [...rubrics];
    newFormValues[i][name] = e.target.value;
    setRubrics(newFormValues);
  };

  const removeRubric = (i: number) => {
    const newFormValues = [...rubrics];
    newFormValues.splice(i, 1);
    setRubrics(newFormValues);
  };
  const addRubric = () => {
    setRubrics([...rubrics, { title: "", score: 0 }]);
  };

  const PostDeliverable = async () => {
    setloader(true);
    const obj = {
      title: deliverableValues.title,
      deadline: deliverableValues.deadline,
      rubrics,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:8000/api/deliverable/add", obj, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", response);
      setDeliverableValues({ title: "", deadline: new Date() });
      setRubrics([{ title: "", score: 0 }]);
      setloader(false);
      props.changeDeliverableTab(0);
    } catch (error) {
      console.log(error);
      setloader(false);
    }
  };

  return (
    <Grid container spacing={2} style={{ margin: "auto", maxWidth: 800 }}>
      <Grid item xs={12} sm={12}>
        <CustomInput
          value={deliverableValues.title}
          handleChange={(e: any) => handleChangeDeliverable(e, "title")}
          field="Title"
          type="text"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props: any) => <TextField fullWidth {...props} />}
            label="Deadline"
            value={deliverableValues.deadline}
            onChange={(e: any) => handleChangeDeliverable(e, "deadline")}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={12}>
        {rubrics.map((rubric: any, i: any) => {
          return (
            <div
              key={i}
              style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
              <div>
                <CustomInput
                  value={rubric.title}
                  handleChange={(e: any) => handleChangeRubrics(i, e, "title")}
                  field="Name"
                  type="text"
                />
              </div>
              <div>
                <CustomInput
                  value={rubric.score}
                  handleChange={(e: any) => handleChangeRubrics(i, e, "score")}
                  field="Score"
                  type="number"
                />
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <CustomButton
                  text="Remove Rubric"
                  loading={false}
                  handleClick={() => removeRubric(i)}
                />
              </div>
            </div>
          );
        })}
        <div style={{ paddingTop: "2rem" }}>
          <CustomButton text="Add Rubric" loading={false} handleClick={addRubric} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        <CustomButton
          loading={loader}
          handleClick={PostDeliverable}
          text="Add Deliverable"
          fullWidth={true}
        />
      </Grid>
    </Grid>
  );
};
