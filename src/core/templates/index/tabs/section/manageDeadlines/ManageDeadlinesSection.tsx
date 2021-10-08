import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { DeadlinesDrawer } from "./DeadlinesDrawer";
// import { ProductDrawer } from "./ProductDrawer";
import { DeadlinesTable } from "./DeadlinesTable";

export const ManageDeadlinesSection = () => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="10"
      >
        <Heading size="lg">Plazos Semanales</Heading>
        <DeadlinesDrawer />
      </Box>
      <DeadlinesTable />
    </Box>
  );
};
