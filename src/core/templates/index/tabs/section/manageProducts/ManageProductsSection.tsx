import React from "react";
import { Box, Divider, Heading } from "@chakra-ui/react";
import { ProductDrawer } from "./ProductDrawer";
import { ProductTable } from "./ProductTable";

export const ManageProductsSection = () => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="10"
      >
        <Heading size="lg">Productos disponibles</Heading>
        <ProductDrawer />
      </Box>
      <ProductTable />
    </Box>
  );
};
