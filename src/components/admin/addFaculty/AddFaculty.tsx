import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { registerFaculty } from "src/features/faculty/facultyActions";
import { facultySelector } from "src/features/faculty/facultySlice";
import { registerBatch } from "src/features/student/studentActions";
import { studentSelector } from "src/features/student/studentSlice";
import { CustomAlert } from "../../base/CustomAlert";
import { CustomButton } from "../../base/CustomButton";
import { CustomInput } from "../../base/CustomInput";
import { CustomTypography } from "../../base/CustomTypography";
// lastName:fac
// password:fac123
// email:fac@fac.com
// firstName:rid
interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  showPassword: boolean;
}

export const AddFaculty = () => {
  const [values, setValues] = React.useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = React.useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { facultyRegisterSuccess, facultyRegisterFail } = useSelector(facultySelector);

  const [selectedFile, setSelectedFile] = React.useState();
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    event.target.files[0] && setIsFilePicked(true);
  };
  const handleAddBatch = async () => {
    try {
      // pass the function in dispatch
      await dispatch(registerFaculty(values));
      if (facultyRegisterSuccess) {
        console.log(facultyRegisterSuccess);
      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div className="App">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          height: "auto",
          width: "40em",
          margin: "4em auto",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <CardContent>
          <CustomTypography text="Add Faculty" variant="h5" component="h5" />
          <div style={{ padding: "1em 0", textAlign: "left", width: "35em", margin: "0.3em auto" }}>
            <CustomInput
              value={values.firstName}
              handleChange={handleChange("firstName")}
              field="First Name"
              type="firstName"
              error={errors.firstName}
              helperText={errors.firstName}
            />
            <CustomInput
              value={values.lastName}
              handleChange={handleChange("lastName")}
              field="Last Name"
              type="lastName"
              error={errors.lastName}
              helperText={errors.lastName}
            />
            <CustomInput
              value={values.email}
              handleChange={handleChange("email")}
              field="Email"
              type="email"
              error={errors.email}
              helperText={errors.email}
            />
            <CustomInput
              value={values.password}
              handleChange={handleChange("password")}
              field="Password"
              type="password"
              error={errors.password}
              helperText={errors.password}
            />
          </div>
        </CardContent>
        <CardActions style={{ padding: "2rem auto", margin: "0 1em" }}>
          <CustomButton text="Add Faculty" loading={false} handleClick={handleAddBatch} />
        </CardActions>
      </Card>
      {facultyRegisterSuccess ? (
        <CustomAlert type="success" content="Faculty added Successfully!" />
      ) : facultyRegisterFail ? (
        <CustomAlert type="error" content="Faculty could not be added!" />
      ) : (
        ""
      )}
    </div>
  );
};
