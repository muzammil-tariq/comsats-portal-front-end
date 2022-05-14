import React from "react";
import { Typography } from "@mui/material";

interface TypoInterface {
  text: string;
  variant: any;
  component: any;
  class?: any;
}
export const CustomTypography = (props: TypoInterface) => {
  const { text, variant, component } = props;
  return (
    <Typography variant={variant} component={component}>
      {text}
    </Typography>
  );
};

// * @default {
//     *   h1: 'h1',
//     *   h2: 'h2',
//     *   h3: 'h3',
//     *   h4: 'h4',
//     *   h5: 'h5',
//     *   h6: 'h6',
//     *   subtitle1: 'h6',
//     *   subtitle2: 'h6',
//     *   body1: 'p',
//     *   body2: 'p',
//     *   inherit: 'p',
//     * }
