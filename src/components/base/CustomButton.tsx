import React from "react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface ButtonProps {
  loading: boolean;
  handleClick: any;
  text: string;
  fullWidth?: boolean;
  type?: string;
}

export const CustomButton = (props: ButtonProps) => {
  const { loading, handleClick, text, fullWidth, type } = props;
  return (
    <Button
      disabled={loading}
      variant="contained"
      onClick={handleClick}
      style={{
        width: fullWidth ? "100%" : "auto",
        backgroundColor: "rgb(157 39 176)",
        color: "white",
      }}
    >
      {text}
      {loading && <CircularProgress color="success" size={20} />}
    </Button>
  );
};
