import React from "react";
import { Box } from "@chakra-ui/react";
import { ProductDrawer } from "./ProductDrawer";

export const ManageProductsSection = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <ProductDrawer />
      </Box>
    </Box>
  );
};
