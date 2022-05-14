import React, { useState } from "react";
import { VisibilityOff } from "@material-ui/icons";
import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

interface InputProps {
  value: string;
  handleChange: any;
  field: string;
  values?: any;
  handleClickShowPassword?: any;
  handleMouseDownPassword?: any;
  type?: string;
  error?: any;
  helperText?: any;
}
export const CustomInput = (props: InputProps) => {
  const {
    value,
    handleChange,
    field,
    values,
    handleClickShowPassword,
    handleMouseDownPassword,
    type,
    error,
    helperText,
  } = props;
  return (
    <div>
      <InputLabel htmlFor={type}>{field}</InputLabel>
      <OutlinedInput
        required
        error={error && true}
        type={values?.showPassword || type !== "password" ? "text" : "password"}
        id={type}
        value={value}
        onChange={handleChange}
        style={{
          width: "100%",
          color: "white",
        }}
        autoComplete="off"
        inputProps={{
          autoComplete: "off",
        }}
        autoSave="none"
        endAdornment={
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values?.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
      {error && (
        <FormHelperText error id="error">
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
};
