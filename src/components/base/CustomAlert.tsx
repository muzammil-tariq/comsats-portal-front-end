import React from "react";
import { Alert, AlertColor } from "@mui/material";

interface AlertProps {
  type: AlertColor | undefined;
  content: string;
}
export const CustomAlert = (props: AlertProps) => {
  const { type, content } = props;
  return <Alert severity={type}>{content}</Alert>;
};
