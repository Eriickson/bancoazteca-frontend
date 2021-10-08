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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { ProductDrawer } from "./ProductDrawer";
import { AlertDialog } from "../../../../../components";
import { useProduct } from "../../../../../context";

const products: Product[] = [
  {
    sku: "123456781",
    name: "Nombre 1",
    description: "Desc 1",
    price: 123,
  },
  {
    sku: "123456782",
    name: "Nombre 1",
    description: "Desc 1",
    price: 123,
  },
];
export const ProductTable = () => {
  const [productSelected, setProductSelected] = useState<Product | undefined>(
    undefined
  );

  const { deleteProduct } = useProduct();

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
            productSelected && deleteProduct(productSelected.sku)
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
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Listado de productos</TableCaption>
        <Thead>
          <Tr>
            <Th>SKU</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th isNumeric>Precio</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr
              key={product.sku}
              fontWeight={
                product.sku === productSelected?.sku ? "semibold" : "normal"
              }
              onClick={() =>
                productSelected?.sku === product.sku
                  ? setProductSelected(undefined)
                  : setProductSelected(product)
              }
              cursor="pointer"
            >
              <Td>{product.sku}</Td>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td isNumeric>MXN$ {product.price}</Td>
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
