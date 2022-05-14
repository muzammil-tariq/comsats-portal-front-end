import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { AdminLogin } from "src/components/auth/AdminLogin";
import { FacultyLogin } from "src/components/auth/FacultyLogin";
import { StudentLogin } from "src/components/auth/StudentLogin";
import { loginStudent } from "src/features/auth/authAction";
import { authSelector, loginSuccess } from "src/features/auth/authSlice";
import { CustomInput } from "../components/base/CustomInput";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LoginPage() {
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { isProcessingRequest, accessToken, message } = useSelector(authSelector);
  const studentLogin = async (email: string, password: string) => {
    try {
      // pass the function in dispatch
      await dispatch(loginStudent(email, password));
      console.log(accessToken);
      if (accessToken) {
        localStorage.setItem("token", accessToken);
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
    if (validate()) {
      return;
    }
    console.log("values", values);
    // { password: 'nimo', email: 'nn@nn.com' }
    studentLogin(values.email, values.password);
    if (accessToken) {
      history.push("/home");
    }
  };

  const loginLinks = [
    {
      title: " Reset your password",
      link: "/reset-password",
    },
    {
      title: " Sign up",
      link: "/signup",
    },
    {
      title: " Privacy Policy ",
      link: "",
    },
    {
      title: " Terms of Service ",
      link: "",
    },
  ];

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
  const handleChanges = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", margin: "5rem 0", marginLeft: "2rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChanges}
          aria-label="basic tabs example"
          centered
          style={{ color: "black" }}
        >
          <Tab label="Student" {...a11yProps(0)} />
          <Tab label="Faculty" {...a11yProps(1)} />
          <Tab label="Admin" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <StudentLogin />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FacultyLogin />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminLogin />
      </TabPanel>
    </Box>
  );
}
