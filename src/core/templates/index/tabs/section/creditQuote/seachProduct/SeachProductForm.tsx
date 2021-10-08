import React, { FC, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableCaption,
  Input,
} from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";
import { useProduct } from "../../../../../../context";
import moment from "moment";
import numeral from "numeral";
import removeAccents from "remove-accents";

interface SeachProductFormProps {
  onClose(): void;
}

export const SeachProductForm: FC<SeachProductFormProps> = ({ onClose }) => {
  const { products, setProductSelected } = useProduct();

  const [productToSelect, setProductToSelected] = useState<Product | undefined>(
    undefined
  );

  const [productsFounds, setProductsFounds] = useState<Product[]>([]);
  const debounced = useDebouncedCallback((value) => {
    const productsFounds = products.filter((product) => {
      const output = removeAccents(value);
      const newRegex = new RegExp(output, "i");
      if (newRegex.test(removeAccents(product.sku))) return true;
      if (newRegex.test(removeAccents(product.name))) return true;

      return false;
    });
    setProductsFounds(productsFounds);
  }, 400);

  useEffect(() => {
    setProductsFounds(products);
    // eslint-disable-next-line
  }, []);

  return (
    <form
      id="search-product-form"
      onSubmit={(e) => {
        e.preventDefault();
        onClose();
        productToSelect && setProductSelected(productToSelect);
      }}
    >
      <Input
        placeholder="Nombre o SKU"
        onChange={(e) => debounced(e.target.value)}
        mb="6"
      />
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
        {productsFounds.map((product) => (
          <Tr
            key={product._id}
            fontWeight={
              product._id === productToSelect?._id ? "semibold" : "normal"
            }
            onClick={() =>
              productToSelect?._id === product._id
                ? setProductToSelected(undefined)
                : setProductToSelected(product)
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
      </Table>
    </form>
  );
};
