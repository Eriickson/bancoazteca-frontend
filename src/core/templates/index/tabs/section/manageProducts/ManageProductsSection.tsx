import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
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
