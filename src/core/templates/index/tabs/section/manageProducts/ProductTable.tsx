import React, { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { ProductDrawer } from "./ProductDrawer";
import { AlertDialog } from "../../../../../components";
import { useProduct } from "../../../../../context";
import numeral from "numeral";
import moment from "moment";
import "moment/locale/es";

export const ProductTable = () => {
  const [productSelected, setProductSelected] = useState<Product | undefined>(
    undefined
  );

  const { products, deleteProduct } = useProduct();

  return (
    <Box>
      <HStack alignItems="flex-start" ml="4" mb="4">
        <ProductDrawer
          type="UPDATE"
          defaultValue={productSelected}
          isDisabled={!Boolean(productSelected)}
        />
        <AlertDialog
          title="Eliminar Producto"
          subtitle="Estás seguro de que quieres eliminar este producto?"
          role="red"
          onClickPrimaryButton={() =>
            productSelected && deleteProduct(productSelected._id)
          }
        >
          <IconButton
            isDisabled={!Boolean(productSelected)}
            colorScheme="red"
            size="sm"
            icon={<DeleteIcon />}
            aria-label="Eliminar un producto"
          />
        </AlertDialog>
      </HStack>
      <Table size="sm" variant="striped" colorScheme="gray">
        <TableCaption>Listado de productos</TableCaption>
        <Thead>
          <Tr>
            <Th>SKU</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Creado</Th>
            <Th isNumeric>Precio</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!products.length && (
            <Tr>
              <Td colSpan={5}>
                <Text
                  textAlign="center"
                  fontWeight="medium"
                  color="gray.400"
                  fontSize="lg"
                >
                  No se han agregado productos
                </Text>
              </Td>
            </Tr>
          )}
          {products.map((product) => (
            <Tr
              key={product._id}
              fontWeight={
                product._id === productSelected?._id ? "semibold" : "normal"
              }
              onClick={() =>
                productSelected?._id === product._id
                  ? setProductSelected(undefined)
                  : setProductSelected(product)
              }
              cursor="pointer"
            >
              <Td>{product.sku}</Td>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>{moment(product.createdAt).locale("es").fromNow()}</Td>
              <Td isNumeric>${numeral(product.price).format("0,0.00")}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>SKU</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th isNumeric>Precio</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
