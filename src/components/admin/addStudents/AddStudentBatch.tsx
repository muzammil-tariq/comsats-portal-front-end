import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CustomInput } from "src/components/base/CustomInput";
import { registerBatch } from "src/features/student/studentActions";
import { studentSelector } from "src/features/student/studentSlice";
import { CustomAlert } from "../../base/CustomAlert";
import { CustomButton } from "../../base/CustomButton";
import { CustomTypography } from "../../base/CustomTypography";

export const AddStudentBatch = () => {
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { batchSuccessful, batchMessage } = useSelector(studentSelector);

  const [selectedFile, setSelectedFile] = React.useState();
  const [selectedBatch, setSelectedBatch] = React.useState("");
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    event.target.files[0] && setIsFilePicked(true);
  };
  const handleAddBatch = async () => {
    if (!selectedFile || !selectedBatch) return;
    try {
      // pass the function in dispatch
      await dispatch(registerBatch(selectedFile, selectedBatch));
      if (batchMessage) {
        console.log(batchMessage);
      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div>
      <Card
        sx={{ minWidth: 275 }}
        style={{
          height: "18rem",
          width: "40em",
          margin: "4em auto",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <CustomTypography text="Upload File to add Students" variant="h5" component="h5" />
        </CardContent>
        <CardActions style={{ padding: "2rem auto", margin: "0 1em", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CustomInput
              value={selectedBatch}
              handleChange={(event: any) => setSelectedBatch(event.target.value)}
              field="Batch"
              type="batch"
              // error={errors.email}
              // helperText={errors.email}
            />{" "}
            <div style={{ margin: "1rem auto" }}>
              <input type="file" name="file" onChange={changeHandler} />
            </div>
            <CustomButton text="Add Batch" loading={false} handleClick={handleAddBatch} />
          </div>
        </CardActions>
      </Card>
      {batchMessage && <CustomAlert type="success" content={batchMessage} />}
    </div>
  );
};
