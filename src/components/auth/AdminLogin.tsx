import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { loginAdmin, loginStudent } from "src/features/auth/authAction";
import { authSelector } from "src/features/auth/authSlice";
import { userType } from "src/types/user.enum";
import { CustomButton } from "../base/CustomButton";
import { CustomInput } from "../base/CustomInput";

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

export const AdminLogin = () => {
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { isProcessingRequest, accessToken, message, loginSuccessful } = useSelector(authSelector);
  const AdminLogin = async (email: string, password: string) => {
    try {
      // pass the function in dispatch
      await dispatch(loginAdmin(email, password));
      console.log(accessToken, loginSuccessful);
      if (accessToken && loginSuccessful) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("type", userType.ADMIN);
        history.push("/admin-profile");
      }
    } catch (er) {
      console.log(message);
    }
  };
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = React.useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userVerified, setUserVerified] = useState<boolean | undefined>();
  const history = useHistory();

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClick = async (event: any) => {
    event.preventDefault();
    setErrors({
      email: "",
      password: "",
      showPassword: false,
    });
    // if (validate()) {
    //   return;
    // }
    console.log("values", values);
    // { password: 'nimo', email: 'nn@nn.com' }
    await AdminLogin(values.email, values.password);
    // if (accessToken) {
    // history.push("/home");
    // }
  };

  // useEffect(() => {

  // }, [accessToken]);

  const validate: any = () => {
    const temp: any = { ...errors };
    let en = 0;
    if (!values.email) {
      temp.email = "This field is required.";
      en += 1;
      console.log("No email");
    }
    if (values.email) {
      temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email) ? "" : "Email is not valid.";
      if (temp.email) {
        en += 1;
        console.log("Invalid email");
      }
    }
    if (!values.password) {
      temp.password = values.password === "" ? "This field is required." : "";
      en += 1;
      console.log("No pass");
    }

    setErrors({
      ...temp,
    });
    return en > 0;
  };
  const [value, setValue] = useState(0);
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  return (
    <div>
      <div style={{ padding: 10 }}>
        <CustomInput
          value={values.email}
          handleChange={handleChange("email")}
          field="Email"
          type="email"
          error={errors.email}
          helperText={errors.email}
        />
      </div>
      <div style={{ padding: 10 }}>
        <CustomInput
          value={values.password}
          handleChange={handleChange("password")}
          field="Password"
          type="password"
          values={values}
          // handleMouseDownPassword={handleMouseDownPassword}
          handleClickShowPassword={handleClickShowPassword}
          error={errors.password}
          helperText={errors.password}
        />
      </div>
      <div style={{ padding: "2rem 0" }}>
        <CustomButton
          loading={isProcessingRequest}
          handleClick={handleClick}
          text="Login"
          fullWidth={true}
        />
      </div>
    </div>
  );
};
