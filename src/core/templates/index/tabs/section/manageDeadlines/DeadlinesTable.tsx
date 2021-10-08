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
import numeral from "numeral";
import { DeadlinesDrawer } from "./DeadlinesDrawer";
import { AlertDialog } from "../../../../../components";
import { useDeadlines } from "../../../../../context";

export const DeadlinesTable = () => {
  const [deadlinesSelected, setDeadlinesSelected] = useState<
    Deadlines | undefined
  >(undefined);

  const { deleteDeadlines, deadlines } = useDeadlines();

  return (
    <Box>
      <HStack alignItems="flex-start" ml="4" mb="4">
        <DeadlinesDrawer
          type="UPDATE"
          defaultValue={deadlinesSelected}
          isDisabled={!Boolean(deadlinesSelected)}
        />
        <AlertDialog
          title="Eliminar Deadlineso"
          subtitle="Estás seguro de que quieres eliminar este plazo?"
          role="red"
          onClickPrimaryButton={() =>
            deadlinesSelected && deleteDeadlines(deadlinesSelected._id)
          }
        >
          <IconButton
            isDisabled={!Boolean(deadlinesSelected)}
            colorScheme="red"
            size="sm"
            icon={<DeleteIcon />}
            aria-label="Eliminar un deadlineso"
          />
        </AlertDialog>
      </HStack>
      <Table size="sm" variant="striped" colorScheme="gray">
        <TableCaption>Listado de Plazos</TableCaption>
        <Thead>
          <Tr>
            <Th>Semanas</Th>
            <Th>Tasa Normal</Th>
            <Th>Tasa Puntual</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!deadlines.length && (
            <Tr>
              <Td colSpan={4}>
                <Text
                  textAlign="center"
                  fontWeight="medium"
                  color="gray.400"
                  fontSize="lg"
                >
                  No se han agregado plazos
                </Text>
              </Td>
            </Tr>
          )}
          {deadlines.map((deadlines) => (
            <Tr
              key={deadlines._id}
              fontWeight={
                deadlines._id === deadlinesSelected?._id ? "semibold" : "normal"
              }
              onClick={() =>
                deadlinesSelected?._id === deadlines._id
                  ? setDeadlinesSelected(undefined)
                  : setDeadlinesSelected(deadlines)
              }
              cursor="pointer"
            >
              <Td>{deadlines.weeks}</Td>
              <Td>{numeral(deadlines.normalRate).format("0,0.0000")}</Td>
              <Td>{numeral(deadlines.punctualRate).format("0,0.0000")}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Semanas</Th>
            <Th>Tasa Normal</Th>
            <Th>Tasa Puntual</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
