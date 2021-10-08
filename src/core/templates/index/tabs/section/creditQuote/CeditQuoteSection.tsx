import React, { useState } from "react";
import { Box, Divider, Flex, Heading, Select } from "@chakra-ui/react";
import { SeachProductModal } from "./seachProduct/SeachProductModal";
import { useDeadlines, useProduct } from "../../../../../context";
import numeral from "numeral";

export const CeditQuoteSection = () => {
  const { productSelected } = useProduct();
  const { deadlines } = useDeadlines();
  const [normalRate, setNormalRate] = useState(0);
  const [punctualRate, setPunctualRate] = useState(0);

  function generateRate(productPrice: number, rate: number, weeks: number) {
    return (productPrice * rate + productPrice) / weeks;
  }

  function onChangeDeadline(value: string) {
    const deadline = deadlines.find(({ _id }) => _id === value);
    if (!deadline || !productSelected) return;

    const normalRate = generateRate(
      productSelected.price,
      deadline.normalRate,
      deadline.weeks
    );
    const punctualRate = generateRate(
      productSelected.price,
      deadline.punctualRate,
      deadline.weeks
    );
    setNormalRate(normalRate);
    setPunctualRate(punctualRate);
  }

  return (
    <Flex>
      <Box flex="1">
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
              <Box>
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
                  Tipo de Prenda:{" "}
                  <strong>{productSelected?.typeGarment}</strong>
                </p>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <SeachProductModal />
        </Box>
        <Divider my="4" />
        <Select
          onChange={(e) => onChangeDeadline(e.target.value)}
          placeholder="Plazos"
        >
          {deadlines.map((deadline) => (
            <option key={deadline._id} value={deadline._id}>
              {deadline.weeks}
            </option>
          ))}
        </Select>
      </Box>
      <Box w="xs">
        <Flex
          h="full"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <strong>
            Abono Semanal: ${numeral(normalRate).format("0,0.00")}
          </strong>
          <strong>
            Abono Puntual: ${numeral(punctualRate).format("0,0.00")}
          </strong>
          <strong></strong>
        </Flex>
      </Box>
    </Flex>
  );
};
