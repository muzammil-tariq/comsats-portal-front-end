import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CustomInput } from "src/components/base/CustomInput";
import { registerFacultyBatch } from "src/features/faculty/facultyActions";
import { facultySelector } from "src/features/faculty/facultySlice";
import { registerBatch } from "src/features/student/studentActions";
import { studentSelector } from "src/features/student/studentSlice";
import { CustomAlert } from "../../base/CustomAlert";
import { CustomButton } from "../../base/CustomButton";
import { CustomTypography } from "../../base/CustomTypography";

export const AddFacultyBatch = () => {
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { batchSuccessful, batchMessage } = useSelector(facultySelector);

  const [selectedFile, setSelectedFile] = React.useState();
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    event.target.files[0] && setIsFilePicked(true);
  };
  const handleAddBatch = async () => {
    if (!selectedFile) return;
    try {
      // pass the function in dispatch
      await dispatch(registerFacultyBatch(selectedFile));
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
          <CustomTypography text="Upload File to add faculty" variant="h5" component="h5" />
        </CardContent>
        <CardActions style={{ padding: "2rem auto", margin: "0 1em", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ margin: "1rem auto" }}>
              <input type="file" name="file" onChange={changeHandler} />
            </div>
            <CustomButton text="Add Faculty Batch" loading={false} handleClick={handleAddBatch} />
          </div>
        </CardActions>
      </Card>
      {batchMessage && <CustomAlert type="success" content={batchMessage} />}
    </div>
  );
};
