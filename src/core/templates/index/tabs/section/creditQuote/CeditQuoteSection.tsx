import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { SeachProductModal } from "./seachProduct/SeachProductModal";
import { useProduct } from "../../../../../context";

export const CeditQuoteSection = () => {
  const { productSelected } = useProduct();

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="6"
      >
        <Heading size="lg">Cotización de créditos</Heading>
      </Box>
      <Box>
        <Box
          w="max-content"
          mb="3"
          border="1px solid"
          borderColor="gray.200"
          p="2"
        >
          {productSelected ? (
            <>
              <p>
                Nombre: <strong>{productSelected?.name}</strong>
              </p>
              <p>
                Material: <strong>{productSelected?.material}</strong>
              </p>
              <p>
                Tamaño: <strong>{productSelected?.size}</strong>
              </p>
              <p>
                Color: <strong>{productSelected?.color}</strong>
              </p>
              <p>
                Precio: <strong>{productSelected?.price}</strong>
              </p>
              <p>
                Tipo de Prenda: <strong>{productSelected?.typeGarment}</strong>
              </p>
            </>
          ) : (
            <></>
          )}
        </Box>
        <SeachProductModal />
      </Box>
    </Box>
  );
};
