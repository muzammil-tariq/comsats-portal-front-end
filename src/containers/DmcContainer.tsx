import { Box, Divider } from "@mui/material";
import React from "react";
import { CustomButton } from "src/components/base/CustomButton";
import { CustomTypography } from "src/components/base/CustomTypography";
import DmcForm from "src/components/dmc/DmcForm";

const DmcContainer = () => {
  return (
    <Box
      sx={{
        width: 800,
        height: 800,
        padding: 5,
      }}
    >
      <CustomTypography text={"Enter DMC Marks : "} variant={"h6"} component={undefined} />
      <Divider />

      <br />
      <DmcForm />

      <Divider />
      <br />
      <CustomButton loading={false} handleClick={undefined} text={"Generate DMC"}></CustomButton>
    </Box>
  );
};

export default DmcContainer;
