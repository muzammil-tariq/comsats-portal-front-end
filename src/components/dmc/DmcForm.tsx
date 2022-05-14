import { Tooltip } from "@mui/material";
import React from "react";
import { CustomButton } from "../base/CustomButton";
import { CustomInput } from "../base/CustomInput";

interface State {
  ScopeSRS: string;
  Final60: string;
  SDS40: string;
  Final100: string;
  ProjectExternal: string;
}

const DmcForm = () => {
  const [values, setValues] = React.useState({
    ScopeSRS: "",
    SDS40: "",
    Final60: "",
    Final100: "",
    ProjectExternal: "",
  });

  const [errors, setErrors] = React.useState<State>({
    ScopeSRS: "",
    SDS40: "",
    Final60: "",
    Final100: "",
    ProjectExternal: "",
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div style={{ marginBlockEnd: "2rem" }}>
      <CustomInput
        value={values.ScopeSRS}
        handleChange={handleChange("ScopeSRS")}
        field="Scope-SRS"
        type="ScopeSRS"
        error={errors.ScopeSRS}
        helperText={"e.g. cool project ScopeSRS"}
      />
      <CustomInput
        value={values.SDS40}
        handleChange={handleChange("SDS40")}
        field="SDD-40%"
        type="SDS40"
        error={errors.SDS40}
        helperText={"e.g. Breif details about your project. (3-5 lines)"}
      />
      <CustomInput
        value={values.Final60}
        handleChange={handleChange("Final60")}
        field="Final-60%"
        type="name"
        error={errors.Final60}
        helperText={"e.g. first you will do LMS then do the machine learning part......."}
      />
      <CustomInput
        value={values.Final100}
        handleChange={handleChange("Final100")}
        field="Final-100%"
        type="name"
        error={errors.Final100}
        helperText={"e.g. MERN, Machine Learning, React Native, DevOps"}
      />
      <CustomInput
        value={values.ProjectExternal}
        handleChange={handleChange("ProjectExternal")}
        field="External."
        type="name"
        error={errors.ProjectExternal}
        helperText={"e.g. A fully working web and Mobile application"}
      />{" "}
    </div>
  );
};

export default DmcForm;
