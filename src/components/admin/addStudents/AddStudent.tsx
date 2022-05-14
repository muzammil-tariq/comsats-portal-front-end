import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { registerBatch, registerStudent } from "src/features/student/studentActions";
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
  regNo: string;
  password: string;
  showPassword: boolean;
}

export const AddStudent = () => {
  const [values, setValues] = React.useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    regNo: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = React.useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    regNo: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { registerStudentSuccess, registerStudentFailed, registeringStudent } =
    useSelector(studentSelector);

  const handleAddStudent = async () => {
    try {
      // pass the function in dispatch
      await dispatch(registerStudent(values));
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
          <CustomTypography text="Add Student" variant="h5" component="h5" />
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
              value={values.regNo}
              handleChange={handleChange("regNo")}
              field="Registration Number"
              type="regNo"
              error={errors.regNo}
              helperText={errors.regNo}
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
          <CustomButton
            text="Add Student"
            loading={registeringStudent}
            handleClick={handleAddStudent}
          />
        </CardActions>
      </Card>
      {registerStudentSuccess ? (
        <CustomAlert type="success" content="Student added Successfully!" />
      ) : registerStudentFailed ? (
        <CustomAlert type="error" content="Student could not be added!" />
      ) : (
        ""
      )}
    </div>
  );
};
